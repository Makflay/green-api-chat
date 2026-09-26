import {
  checkAccount,
  GreenApiHttpError,
  isGreenApiAuthError,
} from "../api/greenApi";
import type { GreenApiCredentials } from "../types/greenApi.type";

export function normalizePhoneNumber(value: string): string {
  return value.replace(/[\s().\-–—]/g, "");
}

export function getPhoneError(value: string): string {
  if (!value.trim()) {
    return "Введите номер телефона.";
  }

  const normalized = normalizePhoneNumber(value);

  if (!/^\+?(7\d{10}|375\d{9})$/.test(normalized)) {
    return "Введите номер РФ или РБ: +7 и 10 цифр либо +375 и 9 цифр.";
  }

  return "";
}

export async function resolveMaxChatId(
  normalizedPhone: string,
  credentials: GreenApiCredentials,
): Promise<string> {
  const phoneError = getPhoneError(normalizedPhone);

  if (phoneError) {
    throw new Error(phoneError);
  }

  const digits = normalizePhoneNumber(normalizedPhone).replace(/^\+/, "");

  let account;

  try {
    account = await checkAccount(credentials, {
      phoneNumber: Number(digits),
    });
  } catch (error) {
    if (isGreenApiAuthError(error)) {
      throw new Error(
        "GREEN-API отклонил доступ. Проверьте API URL, idInstance, токен и права инстанса. Для повторного ввода обновите страницу.",
        { cause: error },
      );
    }

    if (error instanceof GreenApiHttpError && error.status === 400) {
      throw new Error(
        "GREEN-API отклонил запрос проверки номера. Проверьте номер с кодом страны и параметры инстанса.",
        { cause: error },
      );
    }

    throw new Error(
      "Не удалось проверить номер. Проверьте соединение и попробуйте ещё раз.",
      { cause: error },
    );
  }

  if ("status" in account) {
    throw new Error(
      "Не удалось проверить номер. Проверьте авторизацию инстанса и ограничения API.",
    );
  }

  if (!account.exist) {
    throw new Error("Аккаунт MAX для этого номера не найден.");
  }

  if (
    typeof account.chatId !== "string" ||
    !/^[1-9]\d*$/.test(account.chatId)
  ) {
    throw new Error(
      "GREEN-API не вернул корректный идентификатор личного чата.",
    );
  }

  return account.chatId;
}
