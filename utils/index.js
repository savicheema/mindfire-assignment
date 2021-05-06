// global alert

import { useEffect } from "react";
import { renderButton } from "./google";
import { analytics, initFireBaseApp } from "./firebase";

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

export { renderButton, analytics, initFireBaseApp };
