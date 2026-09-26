import { useState, useRef } from "react";
import type { FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  CreateButton,
  FormActions,
  FormContent,
  FormDialog,
  FormRoot,
  FormTitle,
  CreateLabel,
  CreateProgress,
} from "./NewChatForm.styles";

type NewChatFormProps = {
  onCreate: (phone: string) => Promise<string | null>;
  onClose: () => void;
};

function normalizePhoneNumber(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function getPhoneError(value: string): string {
  if (!value.trim()) {
    return "Введите номер телефона.";
  }

  if (/\p{L}/u.test(value)) {
    return "Номер телефона не должен содержать буквы.";
  }

  const normalized = normalizePhoneNumber(value);

  if (!/\d/.test(normalized)) {
    return "Номер телефона должен содержать цифры.";
  }

  if (!/^\+?\d+$/.test(normalized)) {
    return "Знак + допустим только один раз в начале номера.";
  }

  const digits = normalized.replace(/^\+/, "");

  if (!/^(7\d{10}|375\d{9})$/.test(digits)) {
    return "Введите номер РФ или РБ с кодом страны 7 или 375.";
  }

  return "";
}

export function NewChatForm({ onCreate, onClose }: NewChatFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const submittingRef = useRef(false);

  const validationError = getPhoneError(phoneNumber);
  const visibleError = (touched ? validationError : "") || requestError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) {
      return;
    }

    setTouched(true);
    setRequestError("");

    if (validationError) {
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    try {
      const error = await onCreate(normalizePhoneNumber(phoneNumber));

      if (error) {
        setRequestError(error);
      }
    } catch {
      setRequestError("Не удалось создать чат.");
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <FormDialog
      open
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="new-chat-title"
    >
      <FormRoot onSubmit={handleSubmit} noValidate aria-busy={loading}>
        <FormTitle id="new-chat-title">Новый чат</FormTitle>

        <FormContent>
          <TextField
            id="new-chat-phone"
            name="phoneNumber"
            label="Номер телефона"
            placeholder="+7 999 123-45-67"
            type="tel"
            autoComplete="tel"
            autoFocus
            fullWidth
            required
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
              setRequestError("");
            }}
            onBlur={() => setTouched(true)}
            disabled={loading}
            error={Boolean(visibleError)}
            helperText={visibleError || "Введите номер с кодом страны."}
          />
        </FormContent>

        <FormActions>
          <Button type="button" onClick={onClose} disabled={loading}>
            Отмена
          </Button>

          <CreateButton
            type="submit"
            variant="contained"
            disableElevation
            disabled={Boolean(validationError) || loading}
          >
            <CreateLabel $loading={loading}>Создать чат</CreateLabel>
            {loading && (
              <CreateProgress
                size={18}
                color="inherit"
                aria-label="Создание чата"
              />
            )}
          </CreateButton>
        </FormActions>
      </FormRoot>
    </FormDialog>
  );
}
