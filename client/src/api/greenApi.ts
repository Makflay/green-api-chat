import type {
  DeleteNotificationRequest,
  SendMessageRequest,
  SendMessageResponse,
  CheckAccountRequest,
  CheckAccountResponse,
  DeleteNotificationResponse,
  ReceiveNotificationResponse,
} from "../types/greenApi.type";
import type { Credentials } from "../types/chat.type";

const GREEN_API_BASE_URL = "https://api.green-api.com";

export class GreenApiHttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`GREEN-API request failed with status ${status}`);
    this.name = "GreenApiHttpError";
    this.status = status;
  }
}

export function isGreenApiAuthError(error: unknown): boolean {
  return (
    error instanceof GreenApiHttpError &&
    (error.status === 401 || error.status === 403)
  );
}

export async function sendMessage(
  credentials: Credentials,
  payload: SendMessageRequest,
): Promise<SendMessageResponse> {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new GreenApiHttpError(response.status);
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("idMessage" in data) ||
    typeof data.idMessage !== "string" ||
    !data.idMessage.trim()
  ) {
    throw new Error("GREEN-API returned an invalid SendMessage response.");
  }

  return {
    idMessage: data.idMessage,
  };
}

export async function checkAccount(
  credentials: Credentials,
  payload: CheckAccountRequest,
): Promise<CheckAccountResponse> {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_BASE_URL}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new GreenApiHttpError(response.status);
  }

  return response.json() as Promise<CheckAccountResponse>;
}

export async function receiveNotification(
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse | null> {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    {
      method: "GET",
      signal,
    },
  );

  if (!response.ok) {
    throw new GreenApiHttpError(response.status);
  }

  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  const data: unknown = JSON.parse(text);

  if (data === null) {
    return null;
  }

  if (
    typeof data !== "object" ||
    !("receiptId" in data) ||
    typeof data.receiptId !== "number" ||
    !Number.isInteger(data.receiptId) ||
    !("body" in data) ||
    typeof data.body !== "object" ||
    data.body === null ||
    Array.isArray(data.body)
  ) {
    throw new Error("GREEN-API returned an invalid notification envelope.");
  }

  return {
    receiptId: data.receiptId,
    body: data.body,
  };
}

export async function deleteNotification(
  credentials: Credentials,
  request: DeleteNotificationRequest,
  signal?: AbortSignal,
): Promise<DeleteNotificationResponse> {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${request.receiptId}`,
    {
      method: "DELETE",
      signal,
    },
  );

  if (!response.ok) {
    throw new GreenApiHttpError(response.status);
  }

  return response.json() as Promise<DeleteNotificationResponse>;
}
