import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#264653",
      dark: "#1a333b",
      light: "#4b636d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0fa3b1",
    },
    success: {
      main: "#2a9d8f",
    },
  },
  spacing: 8,
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: true,
      },
    },
  },
});
