import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import {
  Archivo,
  Major_Mono_Display,
  Montserrat_Subrayada,
} from "@next/font/google";

export const archivo = Archivo({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const majorMonoDisplay = Major_Mono_Display({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const montserratSubrayada = Montserrat_Subrayada({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    mode: "dark",
  },
  typography: {
    button: {
      fontFamily: montserratSubrayada.style.fontFamily,
    },
    fontFamily: archivo.style.fontFamily,
    h4: {
      fontFamily: majorMonoDisplay.style.fontFamily,
    },
  },
});

export default theme;
