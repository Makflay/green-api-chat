import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";

import { CredentialsForm } from "./components/CredentialsForm";

function App() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 3,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Typography variant="h1" sx={{ color: "primary.main", mb: 1 }}>
          Green API Chat
        </Typography>

        <CredentialsForm />
      </Box>
    </Box>
  );
}

export default App;
