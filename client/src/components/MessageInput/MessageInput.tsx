import type { KeyboardEvent } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Composer,
  InputPanel,
  SendButton,
  TextInput,
  SendProgress,
} from "./MessageInput.styles";

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function MessageInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  loading = false,
}: MessageInputProps) {
  const isInputDisabled = disabled || loading;
  const canSubmit = !isInputDisabled && value.trim().length > 0;

  function handleSubmit() {
    if (canSubmit) {
      onSubmit();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return;
    }

    event.preventDefault();

    if (!event.repeat) {
      handleSubmit();
    }
  }

  return (
    <InputPanel>
      <Composer aria-busy={loading}>
        <TextInput
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Message"
          multiline
          minRows={1}
          maxRows={5}
          disabled={isInputDisabled}
          inputProps={{
            "aria-label": "Текст сообщения",
            onKeyDown: handleKeyDown,
          }}
        />

        <SendButton
          type="button"
          aria-label={loading ? "Отправка сообщения" : "Отправить сообщение"}
          onClick={handleSubmit}
          disabled={!canSubmit}
          disableRipple
        >
          {loading ? (
            <SendProgress
              size={20}
              color="inherit"
              aria-label="Отправка сообщения"
            />
          ) : (
            <SendRoundedIcon />
          )}
        </SendButton>
      </Composer>
    </InputPanel>
  );
}
