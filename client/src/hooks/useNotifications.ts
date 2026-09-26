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

export function useNotifications(
  credentials: GreenApiCredentials | null,
  onNotification: (
    notification: IncomingTextNotificationResponse,
  ) => Promise<boolean>,
): void {
  const callbackRef = useRef(onNotification);
  const requestInFlightRef = useRef(false);

  useEffect(() => {
    callbackRef.current = onNotification;
  }, [onNotification]);

  const apiUrl = credentials?.apiUrl;
  const idInstance = credentials?.idInstance;
  const apiTokenInstance = credentials?.apiTokenInstance;

  useEffect(() => {
    if (!apiUrl || !idInstance || !apiTokenInstance) {
      return;
    }

    const currentCredentials: GreenApiCredentials = {
      apiUrl,
      idInstance,
      apiTokenInstance,
    };

    let stopped = false;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    function scheduleNext() {
      if (!stopped) {
        timerId = setTimeout(() => {
          void poll();
        }, POLLING_DELAY_MS);
      }
    }

    async function poll(): Promise<void> {
      if (stopped) {
        return;
      }

      if (requestInFlightRef.current) {
        scheduleNext();
        return;
      }

      requestInFlightRef.current = true;

      try {
        const notification =
          await greenApi.receiveNotification(currentCredentials);

        if (stopped || notification === null) {
          return;
        }

        let canDelete = false;

        if (isIncomingTextNotification(notification)) {
          try {
            canDelete = await callbackRef.current(notification);
          } catch {
            // Ошибка обработки: уведомление остаётся в очереди.
            return;
          }
        } else {
          canDelete = isUnsupportedNotification(notification);
        }

        if (stopped || !canDelete) {
          return;
        }

        try {
          const result = await greenApi.deleteNotification(currentCredentials, {
            receiptId: notification.receiptId,
          });

          if (!result.result) {
            // Удаление не подтверждено. Продолжим обычный polling.
            return;
          }
        } catch {
          // Сохранённое сообщение остаётся в state.
          // Дополнительный запрос или отдельный retry не запускаем.
        }
      } catch {
        // Ошибка получения: следующий цикл с обычной задержкой.
      } finally {
        requestInFlightRef.current = false;
        scheduleNext();
      }
    }

    timerId = setTimeout(() => {
      void poll();
    }, 0);

    return () => {
      stopped = true;

      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
    };
  }, [apiUrl, idInstance, apiTokenInstance]);
}
