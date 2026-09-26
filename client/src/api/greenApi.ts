import type { Credentials } from "../types/chat";
import type {
  DeleteNotificationRequest,
  SendMessageRequest,
} from "../types/greenApi.types";

export const sendMessage: (
  credentials: Credentials,
  request: SendMessageRequest,
) => Promise<unknown> = () => {
  return Promise.reject(new Error("GREEN-API sendMessage is not implemented."));
};

export const receiveNotification: (
  credentials: Credentials,
) => Promise<unknown> = () => {
  return Promise.reject(
    new Error("GREEN-API receiveNotification is not implemented."),
  );
};

export const deleteNotification: (
  credentials: Credentials,
  request: DeleteNotificationRequest,
) => Promise<unknown> = () => {
  return Promise.reject(
    new Error("GREEN-API deleteNotification is not implemented."),
  );
};
