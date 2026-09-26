import type { Credentials } from "../types/chat.type";
import type {
  DeleteNotificationRequest,
  SendMessageRequest,
  GreenApiCredentials,
  SendMessageResponse,
  CheckAccountRequest,
  CheckAccountResponse,
} from "../types/greenApi.type";

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

export async function checkAccount(
  credentials: GreenApiCredentials,
  payload: CheckAccountRequest,
): Promise<CheckAccountResponse> {
  const { apiUrl, idInstance, apiTokenInstance } = credentials;
  const baseUrl = apiUrl.replace(/\/+$/, "");

  const response = await fetch(
    `${baseUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
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
      `GREEN-API CheckAccount failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<CheckAccountResponse>;
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
