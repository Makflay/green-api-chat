export type SendMessageRequest = {
  chatId: string;
  message: string;
};

export type DeleteNotificationRequest = {
  receiptId: string | number;
};
