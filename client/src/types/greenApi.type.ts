import type { Credentials } from "./chat.type";

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

export type CheckAccountRequest = {
  phoneNumber: number;
};

export type CheckAccountResponse =
  | {
      exist: boolean;
      chatId: string;
      fromCache: boolean;
    }
  | {
      status: false;
      reason: string;
    };
