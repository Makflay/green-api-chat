import type { KeyboardEvent } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Composer,
  InputPanel,
  SendButton,
  TextInput,
} from "./MessageInput.styles";

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function MessageInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: MessageInputProps) {
  const canSubmit = !disabled && value.trim().length > 0;

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return;
    }

    event.preventDefault();

    if (canSubmit && !event.repeat) {
      onSubmit();
    }
  }

  return (
    <InputPanel>
      <Composer>
        <TextInput
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Message"
          multiline
          minRows={1}
          maxRows={5}
          disabled={disabled}
          inputProps={{
            "aria-label": "Текст сообщения",
            onKeyDown: handleKeyDown,
          }}
        />

        <SendButton
          type="button"
          aria-label="Отправить сообщение"
          onClick={onSubmit}
          disabled={disabled}
          disableRipple
        >
          <SendRoundedIcon />
        </SendButton>
      </Composer>
    </InputPanel>
  );
}
