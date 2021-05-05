import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import { ThumbUp } from "@material-ui/icons";

import SignUpForm from "../components/SignupForm";
import Poster from "../components/Poster";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "hsla(151,57%,60.8%,1)",
      main: "hsla(151,57%,50.8%,1)",
      dark: "hsla(151,57%,40.8%,1)",
      contrastText: "#ffffff",

    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },

});


export default function Home() {
  let [isAllValid, setValid] = useState(false);

  const validate = (isValid: boolean) => {
    setValid(isValid);
  };


  return (
    <div className={styles.container}>
      <Head>
        <title> Mindfire Assignment </title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Poster />

      <div className={styles.form}>
        <div className={styles.formContent}>
          <Image width={156} height={38} src="/logo_mindfire-white.jpg" />

          <ThemeProvider theme={theme}>
            {isAllValid ? (
              <div className={styles.successContainer}>
                <ThumbUp
                  color="primary"
                  fontSize="large"
                  classes={{ root: styles.rootLargeIcon }}
                />
                <div className={styles.successLabel}>Success!</div>
              </div>
            ) : (
              <SignUpForm validate={validate} />
            )}
          </ThemeProvider>

          <p className={styles.byClickingTheButt}>
            By clicking the button, I agree to the{" "}
            <Link href="/#">
              <a rel="noopener noreferrer" className={styles.anchor}>
                Terms of Services
              </a>
            </Link>
            and
            <Link href="/#">
              <a rel="noopener noreferrer" className={styles.anchor}>
                Privacy Policy
              </a>
            </Link>
          </p>

          <div className={styles.alreadyAMemberSi}>
            Already a member?{" "}
            <Link href="/signin">
              <a rel="noopener noreferrer" className={styles.anchor}>
                Sign in
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
