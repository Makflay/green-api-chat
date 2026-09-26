import { useState, useEffect, useRef } from "react";

import * as greenApi from "../api/greenApi";
import type { IncomingTextNotificationResponse } from "../types/greenApi.type";
import type { Credentials } from "../types/chat.type";

import {
  isIncomingTextNotification,
  isUnsupportedNotification,
} from "../utils/isIncomingTextNotification";

const POLLING_DELAY_MS = 3000;

function hasValidCredentialFormat(
  idInstance: string,
  apiTokenInstance: string,
): boolean {
  return /^\d+$/.test(idInstance) && Boolean(apiTokenInstance);
}

export function useNotifications(
  credentials: Credentials | null,
  onNotification: (
    notification: IncomingTextNotificationResponse,
  ) => Promise<boolean>,
): string | null {
  const [pollingError, setPollingError] = useState<string | null>(null);
  const callbackRef = useRef(onNotification);
  const cycleInFlightRef = useRef(false);

  useEffect(() => {
    callbackRef.current = onNotification;
  }, [onNotification]);

  const idInstance = credentials?.idInstance.trim() ?? "";
  const apiTokenInstance = credentials?.apiTokenInstance.trim() ?? "";

  useEffect(() => {
    if (!hasValidCredentialFormat(idInstance, apiTokenInstance)) {
      return;
    }

    const currentCredentials: Credentials = {
      idInstance,
      apiTokenInstance,
    };

    const controller = new AbortController();

    let stopped = false;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    function reportPollingError(error: unknown, fallback: string) {
      if (stopped) {
        return;
      }

      if (greenApi.isGreenApiAuthError(error)) {
        setPollingError(
          "GREEN-API отклонил доступ. Получение сообщений остановлено. Проверьте учетные данные и права инстанса; для повторного ввода обновите страницу.",
        );

        stopped = true;
        controller.abort();
        return;
      }

      setPollingError(fallback);
    }

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

        if (stopped) {
          return;
        }

        if (notification === null) {
          setPollingError(null);
          return;
        }

        let canDelete = false;

        if (isIncomingTextNotification(notification)) {
          try {
            canDelete = await callbackRef.current(notification);
          } catch {
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

          if (stopped) {
            return;
          }

          if (!result.result) {
            setPollingError(
              "Не удалось подтвердить обработку уведомления. Проверка продолжится автоматически.",
            );
            return;
          }

          setPollingError(null);
        } catch (error) {
          reportPollingError(
            error,
            "Не удалось подтвердить обработку уведомления. Уже сохранённые сообщения остаются в чате; проверка продолжится автоматически.",
          );
        }
      } catch (error) {
        reportPollingError(
          error,
          "Не удалось получить уведомления. Следующая попытка будет выполнена автоматически.",
        );
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
  }, [idInstance, apiTokenInstance]);
  return pollingError;
}
