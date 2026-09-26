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

import type { GreenApiCredentials } from "../../types/greenApi.type";

type CredentialsFormProps = {
  onConnect: (credentials: GreenApiCredentials) => void;
  loading?: boolean;
};

function isValidApiUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}

export function CredentialsForm({
  onConnect,
  loading = false,
}: CredentialsFormProps) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [touched, setTouched] = useState({
    apiUrl: false,
    idInstance: false,
    apiTokenInstance: false,
  });
  const [apiUrl, setApiUrl] = useState("");

  const apiUrlError = touched.apiUrl && !isValidApiUrl(apiUrl);

  const idInstanceError = touched.idInstance && !idInstance.trim();
  const apiTokenInstanceError =
    touched.apiTokenInstance && !apiTokenInstance.trim();
  const canConnect =
    isValidApiUrl(apiUrl) &&
    Boolean(idInstance.trim()) &&
    Boolean(apiTokenInstance.trim());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setTouched({
      apiUrl: false,
      idInstance: true,
      apiTokenInstance: true,
    });

    if (!canConnect) {
      return;
    }

    onConnect({
      apiUrl: apiUrl.trim().replace(/\/+$/, ""),
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
            id="apiUrl"
            name="apiUrl"
            label="API URL"
            type="url"
            value={apiUrl}
            onChange={(event) => setApiUrl(event.target.value)}
            onBlur={() =>
              setTouched((current) => ({ ...current, apiUrl: true }))
            }
            disabled={loading}
            error={apiUrlError}
            helperText={apiUrlError ? "Введите корректный apiUrl" : " "}
            required
            fullWidth
            autoComplete="off"
          />

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
