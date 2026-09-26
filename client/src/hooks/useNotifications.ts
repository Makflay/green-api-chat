import { useEffect, useRef } from "react";

import * as greenApi from "../api/greenApi";
import type {
  GreenApiCredentials,
  ReceiveNotificationResponse,
} from "../types/greenApi.type";

const POLLING_DELAY_MS = 3000;

export function useNotifications(
  credentials: GreenApiCredentials | null,
  onNotification: (notification: ReceiveNotificationResponse) => void,
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

        if (!stopped && notification !== null) {
          callbackRef.current(notification);
        }
      } catch {
        // Ошибка не останавливает цикл, следующий запрос с обычной задержкой.
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
