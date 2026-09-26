import { useEffect, useRef } from "react";

import * as greenApi from "../api/greenApi";
import type {
  GreenApiCredentials,
  IncomingTextNotificationResponse,
} from "../types/greenApi.type";
import {
  isIncomingTextNotification,
  isUnsupportedNotification,
} from "../utils/isIncomingTextNotification";

const POLLING_DELAY_MS = 3000;

function hasValidCredentialFormat(
  apiUrl: string,
  idInstance: string,
  apiTokenInstance: string,
): boolean {
  if (!/^\d+$/.test(idInstance) || !apiTokenInstance) {
    return false;
  }

  try {
    const url = new URL(apiUrl);

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}

export function useNotifications(
  credentials: GreenApiCredentials | null,
  onNotification: (
    notification: IncomingTextNotificationResponse,
  ) => Promise<boolean>,
): void {
  const callbackRef = useRef(onNotification);
  const cycleInFlightRef = useRef(false);

  useEffect(() => {
    callbackRef.current = onNotification;
  }, [onNotification]);

  const apiUrl = credentials?.apiUrl.trim().replace(/\/+$/, "") ?? "";
  const idInstance = credentials?.idInstance.trim() ?? "";
  const apiTokenInstance = credentials?.apiTokenInstance.trim() ?? "";

  useEffect(() => {
    if (!hasValidCredentialFormat(apiUrl, idInstance, apiTokenInstance)) {
      return;
    }

    const currentCredentials: GreenApiCredentials = {
      apiUrl,
      idInstance,
      apiTokenInstance,
    };

    const controller = new AbortController();

    let stopped = false;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    function scheduleNext(delay = POLLING_DELAY_MS) {
      if (stopped) {
        return;
      }

      if (timerId !== undefined) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        timerId = undefined;
        void poll();
      }, delay);
    }

    async function poll(): Promise<void> {
      if (stopped) {
        return;
      }

      // Предыдущий экземпляр эффекта может ещё завершать отменённый цикл.
      if (cycleInFlightRef.current) {
        scheduleNext();
        return;
      }

      cycleInFlightRef.current = true;

      try {
        const notification = await greenApi.receiveNotification(
          currentCredentials,
          controller.signal,
        );

        if (stopped || notification === null) {
          return;
        }

        let canDelete = false;

        if (isIncomingTextNotification(notification)) {
          try {
            canDelete = await callbackRef.current(notification);
          } catch {
            // Обработка не подтверждена — уведомление не удаляем.
            return;
          }
        } else {
          canDelete = isUnsupportedNotification(notification);
        }

        if (stopped || !canDelete) {
          return;
        }

        try {
          const result = await greenApi.deleteNotification(
            currentCredentials,
            {
              receiptId: notification.receiptId,
            },
            controller.signal,
          );

          if (stopped || !result.result) {
            return;
          }
        } catch {
          // Локально сохранённое сообщение остаётся в state.
          // Повторная попытка возможна в следующем обычном цикле.
        }
      } catch {
        // Ошибка получения или отмена запроса.
        // Cleanup запрещает запуск следующего цикла после остановки.
      } finally {
        cycleInFlightRef.current = false;
        scheduleNext();
      }
    }

    scheduleNext(0);

    return () => {
      stopped = true;

      if (timerId !== undefined) {
        clearTimeout(timerId);
        timerId = undefined;
      }

      controller.abort();
    };
  }, [apiUrl, idInstance, apiTokenInstance]);
}
