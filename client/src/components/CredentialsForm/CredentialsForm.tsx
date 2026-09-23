import { useState } from "react";
import Typography from "@mui/material/Typography";
import type { FormEvent } from "react";
import {
  Card,
  ConnectButton,
  Field,
  Form,
  Header,
  Screen,
} from "./CredentialsForm.styles";

export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
};

type CredentialsFormProps = {
  onConnect: (credentials: Credentials) => void;
};

export function CredentialsForm({ onConnect }: CredentialsFormProps) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const idInstanceError = submitted && !idInstance.trim();
  const apiTokenInstanceError = submitted && !apiTokenInstance.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const credentials: Credentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };

    if (!credentials.idInstance || !credentials.apiTokenInstance) {
      return;
    }

    onConnect(credentials);
  }

  return (
    <Screen>
      <Card aria-labelledby="credentials-title">
        <Header>
          <Typography id="credentials-title" component="h1" variant="h2">
            Подключение к GREEN-API
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Введите учетные данные вашего инстанса.
          </Typography>
        </Header>

        <Form
          aria-labelledby="credentials-title"
          onSubmit={handleSubmit}
          noValidate
        >
          <Field
            id="idInstance"
            name="idInstance"
            label="idInstance"
            value={idInstance}
            onChange={(event) => setIdInstance(event.target.value)}
            error={idInstanceError}
            helperText={idInstanceError ? "Введите idInstance." : undefined}
            required
            variant="outlined"
            fullWidth
            autoComplete="off"
            slotProps={{
              htmlInput: {
                spellCheck: false,
                autoCapitalize: "none",
              },
            }}
          />

          <Field
            id="apiTokenInstance"
            name="apiTokenInstance"
            label="apiTokenInstance"
            type="password"
            value={apiTokenInstance}
            onChange={(event) => setApiTokenInstance(event.target.value)}
            error={apiTokenInstanceError}
            helperText={
              apiTokenInstanceError ? "Введите apiTokenInstance." : undefined
            }
            required
            variant="outlined"
            fullWidth
            autoComplete="off"
            slotProps={{
              htmlInput: {
                spellCheck: false,
                autoCapitalize: "none",
              },
            }}
          />

          <ConnectButton
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
          >
            Connect
          </ConnectButton>
        </Form>
      </Card>
    </Screen>
  );
}
