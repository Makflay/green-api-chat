import type { Credentials } from "../types/chat";
import type {
  DeleteNotificationRequest,
  SendMessageRequest,
  GreenApiCredentials,
  SendMessageResponse,
} from "../types/greenApi.types";

export async function sendMessage(
  credentials: GreenApiCredentials,
  payload: SendMessageRequest,
): Promise<SendMessageResponse> {
  const { apiUrl, idInstance, apiTokenInstance } = credentials;
  const baseUrl = apiUrl.replace(/\/+$/, "");

  const response = await fetch(
    `${baseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(
      `GREEN-API SendMessage failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<SendMessageResponse>;
}

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
