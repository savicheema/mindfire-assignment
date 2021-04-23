import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import React from "react";

import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import { AccountCircle, Mail, PhoneAndroid } from "@material-ui/icons";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgba(0, 214, 123, 0.5)",
      main: "rgba(0, 214, 123, 0.9)",
      dark: "rgb(0, 214, 123, 1)",
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

import {
  FormControl,
  InputLabel,
  FilledInput,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";

import User from "../components/user";
import Envelope from "../components/email";

export default function Home() {
  const userIconRef = React.createRef();
  const envelopeIconRef = React.createRef();
  const phoneIconRef = React.createRef();

  return (
    <div className={styles.container}>
      <Head>
        <title> Taygo Assignment </title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.poster}>
        <Image src="/poster_bg.svg" className={styles.image} layout="fill" />
        <Image src="/logo-white.png" width={220} height={54} />

        <p className={styles.mortgageShoppingEx}>
          Mortgage Shopping Experinece Customized For You
        </p>
        <div className={styles.rectangleSlim}></div>
      </div>
      <div className={styles.form}>
        <div className={styles.formContent}>
          <Image width={178} height={42} src="/logo_green.png" />

          <div className={styles.title}>Sign up to TAYGO</div>

          <ThemeProvider theme={theme}>
            <form className={styles.formGroup}>
              <TextField
                placeholder="John"
                label="Full Name"
                className={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle ref={userIconRef} />
                    </InputAdornment>
                  ),
                }}
                onFocus={() => {
                  userIconRef.current.style.color = "rgba(0, 214, 123, 0.9)";
                }}
                onBlur={() => {
                  userIconRef.current.style.color = "#ddd";
                }}
              />
              <TextField
                placeholder="example@site.com"
                label="Email"
                className={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail ref={envelopeIconRef} />
                    </InputAdornment>
                  ),
                }}
                onFocus={() => {
                  envelopeIconRef.current.style.color =
                    "rgba(0, 214, 123, 0.9)";
                }}
                onBlur={() => {
                  envelopeIconRef.current.style.color = "#ddd";
                }}
              />
              <TextField
                placeholder="888-888-888"
                label="Mobile Number"
                className={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroid ref={phoneIconRef} />
                    </InputAdornment>
                  ),
                }}
                onFocus={() => {
                  phoneIconRef.current.style.color = "rgba(0, 214, 123, 0.9)";
                }}
                onBlur={() => {
                  phoneIconRef.current.style.color = "#ddd";
                }}
              />

              <Button
                variant="contained"
                color="primary"
                className={styles.buttonFont}
              >
                Start with TAYGO
              </Button>
            </form>
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
            <Link href="/#">
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
