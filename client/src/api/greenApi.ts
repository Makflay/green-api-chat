import type {
  DeleteNotificationRequest,
  SendMessageRequest,
  GreenApiCredentials,
  SendMessageResponse,
  CheckAccountRequest,
  CheckAccountResponse,
  DeleteNotificationResponse,
  ReceiveNotificationResponse,
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

export async function receiveNotification(
  credentials: GreenApiCredentials,
): Promise<ReceiveNotificationResponse | null> {
  const { apiUrl, idInstance, apiTokenInstance } = credentials;
  const baseUrl = apiUrl.replace(/\/+$/, "");

  const response = await fetch(
    `${baseUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(
      `GREEN-API ReceiveNotification failed with status ${response.status}`,
    );
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
  credentials: GreenApiCredentials,
  request: DeleteNotificationRequest,
): Promise<DeleteNotificationResponse> {
  const { apiUrl, idInstance, apiTokenInstance } = credentials;
  const baseUrl = apiUrl.replace(/\/+$/, "");

  const response = await fetch(
    `${baseUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${request.receiptId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error(
      `GREEN-API DeleteNotification failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<DeleteNotificationResponse>;
}
