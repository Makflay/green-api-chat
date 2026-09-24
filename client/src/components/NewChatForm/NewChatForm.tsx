import { useState } from "react";
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
} from "./NewChatForm.styles";
import type { Chat } from "../../types/chat";

type NewChatFormProps = {
  onCreate: (chat: Chat) => void;
  onClose: () => void;
};

function normalizePhoneNumber(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function NewChatForm({ onCreate, onClose }: NewChatFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!phoneNumber.trim()) {
      setError("Введите номер телефона.");
      return;
    }

    if (/\p{L}/u.test(phoneNumber)) {
      setError("Номер телефона не должен содержать буквы.");
      return;
    }

    const normalized = normalizePhoneNumber(phoneNumber);

    if (!/\d/.test(normalized)) {
      setError("Номер телефона должен содержать цифры.");
      return;
    }

    if (!/^\+?\d+$/.test(normalized)) {
      setError("Знак + допустим только один раз в начале номера.");
      return;
    }

    onCreate({ id: normalized, phone: normalized, messages: [] });
  }

  return (
    <FormDialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="new-chat-title"
    >
      <FormRoot onSubmit={handleSubmit} noValidate>
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
              setError("");
            }}
            error={Boolean(error)}
            helperText={error || "Введите номер с кодом страны."}
          />
        </FormContent>

        <FormActions>
          <Button type="button" onClick={onClose}>
            Отмена
          </Button>

          <CreateButton type="submit" variant="contained" disableElevation>
            Создать чат
          </CreateButton>
        </FormActions>
      </FormRoot>
    </FormDialog>
  );
}
