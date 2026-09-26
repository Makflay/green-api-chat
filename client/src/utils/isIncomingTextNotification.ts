import type {
  IncomingTextNotificationResponse,
  ReceiveNotificationResponse,
} from "../types/greenApi.type";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isIncomingTextNotification(
  notification: ReceiveNotificationResponse,
): notification is IncomingTextNotificationResponse {
  const { body } = notification;

  if (!isRecord(body)) {
    return false;
  }

  if (
    body.typeWebhook !== "incomingMessageReceived" ||
    typeof body.timestamp !== "number" ||
    !Number.isFinite(body.timestamp) ||
    typeof body.idMessage !== "string"
  ) {
    return false;
  }

  const senderData = body.senderData;

  if (
    !isRecord(senderData) ||
    typeof senderData.chatId !== "string" ||
    typeof senderData.sender !== "string" ||
    typeof senderData.senderName !== "string" ||
    typeof senderData.senderPhoneNumber !== "number" ||
    !Number.isFinite(senderData.senderPhoneNumber)
  ) {
    return false;
  }

  const messageData = body.messageData;

  if (!isRecord(messageData) || messageData.typeMessage !== "textMessage") {
    return false;
  }

  const textMessageData = messageData.textMessageData;

  return (
    isRecord(textMessageData) && typeof textMessageData.textMessage === "string"
  );
}

export function isUnsupportedNotification(
  notification: ReceiveNotificationResponse,
): boolean {
  const { body } = notification;

  if (!isRecord(body) || typeof body.typeWebhook !== "string") {
    return false;
  }

  if (body.typeWebhook !== "incomingMessageReceived") {
    return true;
  }

  const messageData = body.messageData;

  return (
    isRecord(messageData) &&
    typeof messageData.typeMessage === "string" &&
    messageData.typeMessage !== "textMessage"
  );
}
