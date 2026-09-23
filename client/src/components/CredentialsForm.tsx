import Typography from "@mui/material/Typography";
import {
  Card,
  ConnectButton,
  Field,
  Form,
  Header,
  Screen,
} from "./CredentialsForm.styles";

export function CredentialsForm() {
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
          onSubmit={(event) => event.preventDefault()}
        >
          <Field
            id="idInstance"
            name="idInstance"
            label="idInstance"
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
