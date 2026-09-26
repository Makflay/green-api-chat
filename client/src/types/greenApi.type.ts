export type SendMessageRequest = {
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type DeleteNotificationRequest = {
  receiptId: number;
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

export type IncomingTextNotificationResponse = {
  receiptId: number;
  body: {
    typeWebhook: "incomingMessageReceived";
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      sender: string;
      senderName: string;
      senderPhoneNumber: number;
    };
    messageData: {
      typeMessage: "textMessage";
      textMessageData: {
        textMessage: string;
      };
    };
  };
};

export type DeleteNotificationResponse = {
  result: boolean;
};

export type ReceiveNotificationResponse = {
  receiptId: number;
  body: unknown;
};
