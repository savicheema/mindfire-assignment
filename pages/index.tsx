import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@material-ui/core/styles";

import { ThumbUp } from "@material-ui/icons";

import SignUpForm from "../components/SignupForm";
import Poster from "../components/Poster";

import { theme } from "../utils";
import credentials from "../credentials.json";

import { providers, signIn, getSession, csrfToken } from "next-auth/client";



export default function Home({ providers }) {
  let [isAllValid, setValid] = useState(false);

  const validate = (isValid: boolean) => {
    setValid(isValid);
  };


  const signUpSection = () => {
    const signInList = [
      <SignUpForm validate={validate} key={0} />
    ];


    const list = signInList.concat(
      [
        <button className={styles.googleAuthButton} key={0} onClick={() => { signIn("google", { callbackUrl: `http://${window.location.host}/user/profile` }) }}>Sign in Google</button>
      ]
    );

    console.log("LIST", list);

    return list;
  }

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
              signUpSection()
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

Home.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(),
    csrfToken: await csrfToken(context),
  };
};