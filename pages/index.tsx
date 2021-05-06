import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@material-ui/core/styles";

import { ThumbUp } from "@material-ui/icons";

import SignUpForm from "../components/SignupForm";
import Poster from "../components/Poster";

import { useScript, renderButton, theme, initFireBaseApp } from "../utils";
import credentials from "../credentials.json";




export default function Home() {
  let [isAllValid, setValid] = useState(false);

  const validate = (isValid: boolean) => {
    setValid(isValid);
  };

  const googleContent = `${credentials.clientId}`;

  useScript("https://apis.google.com/js/platform.js", () => { renderButton() })
  useScript("https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js", () => { initFireBaseApp() })

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
        <meta name="google-signin-client_id" content={googleContent} />
      </Head>

      <Poster />

      <div className={styles.form}>
        <Link href="/user/profile" >Profile</Link>

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
              [<SignUpForm validate={validate} key={0} />, <div id="my-signin2" key={1}></div>]
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
