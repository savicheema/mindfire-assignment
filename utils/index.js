// global alert

import { useEffect } from "react";
import { renderButton } from "./google";
import { analytics, initFireBaseApp } from "./firebase";
import { createMuiTheme } from "@material-ui/core/styles";

export const capitalize = (stringInput) =>
  stringInput.charAt(0).toUpperCase() + stringInput.slice(1);

export const useScript = (url, onLoad) => {
  // alert("yo1!");

  useEffect(() => {
    const script = document.createElement("script");

    // script.async = true;
    // script.defer = true;
    script.onload = onLoad;

    script.src = url;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, onLoad]);
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "hsla(225, 55%, 10%, 1)",
      main: "hsla(225, 55%, 5%, 1)",
      dark: "hsla(225, 55%, 0%, 1)",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "hsla(10.2, 90.5%, 70.4%, 0.8)",
      main: "hsla(10.2, 90.5%, 60.4%, 1)",
      dark: "hsla(10.2, 90.5%, 50.4%, 1)",
      contrastText: "#000",
    },
  },
});

export { analytics, initFireBaseApp, renderButton };
