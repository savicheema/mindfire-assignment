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

    script.async = true;
    script.defer = true;
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
      light: "hsla(151,57%,60.8%,1)",
      main: "hsla(151,57%,50.8%,1)",
      dark: "hsla(151,57%,40.8%,1)",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "hsla(1000,100%,100%, 0.8)",
      main: "hsla(1000,100%,98%, 1)",
      dark: "hsla(1000,100%,95%, 1)",
      contrastText: "#000",
    },
  },
});

export { renderButton, analytics, initFireBaseApp };
