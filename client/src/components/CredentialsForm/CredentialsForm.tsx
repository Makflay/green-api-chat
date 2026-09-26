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
  ConnectLabel,
  ConnectProgress,
} from "./CredentialsForm.styles";

import type { Credentials } from "../../types/chat.type";

type CredentialsFormProps = {
  onConnect: (credentials: Credentials) => void;
  loading?: boolean;
};

export function CredentialsForm({
  onConnect,
  loading = false,
}: CredentialsFormProps) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [touched, setTouched] = useState({
    idInstance: false,
    apiTokenInstance: false,
  });

  const idInstanceError = touched.idInstance && !idInstance.trim();
  const apiTokenInstanceError =
    touched.apiTokenInstance && !apiTokenInstance.trim();
  const canConnect =
    Boolean(idInstance.trim()) && Boolean(apiTokenInstance.trim());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setTouched({
      idInstance: true,
      apiTokenInstance: true,
    });

    if (!canConnect) {
      return;
    }

    onConnect({
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    });
  }

  return (
    <Screen>
      <Card aria-labelledby="credentials-title">
        <Header>
          <Typography id="credentials-title" component="h1" variant="h2">
            Подключение к GREEN-API
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Введите учетные данные из кабинета GREEN-API.
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
            disabled={loading}
            onBlur={() =>
              setTouched((current) => ({ ...current, idInstance: true }))
            }
            error={idInstanceError}
            helperText={
              idInstanceError ? "Введите корректный idInstance." : " "
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

          <Field
            id="apiTokenInstance"
            name="apiTokenInstance"
            label="apiTokenInstance"
            type="password"
            value={apiTokenInstance}
            onChange={(event) => setApiTokenInstance(event.target.value)}
            disabled={loading}
            onBlur={() =>
              setTouched((current) => ({ ...current, apiTokenInstance: true }))
            }
            error={apiTokenInstanceError}
            helperText={
              apiTokenInstanceError
                ? "Введите корректный apiTokenInstance."
                : " "
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
            disabled={!canConnect || loading}
          >
            <ConnectLabel $loading={loading}>Connect</ConnectLabel>

            {loading && (
              <ConnectProgress
                size={18}
                color="inherit"
                aria-label="Подключение"
              />
            )}
          </ConnectButton>
        </Form>
      </Card>
    </Screen>
  );
}
