import type { Credentials } from "./chat";

export type GreenApiCredentials = Credentials & {
  apiUrl: string;
};

export type SendMessageRequest = {
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type DeleteNotificationRequest = {
  receiptId: string | number;
};
