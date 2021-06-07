import React, { useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import SignInForm from "../components/SigninForm";

import Poster from "../components/Poster";

import styles from '../styles/Home.module.css';

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThumbUp } from "@material-ui/icons";

import { theme } from "../utils";

import { providers, signIn, getSession, csrfToken, signOut } from "next-auth/client";
import { Button } from '@material-ui/core';

const SignIn = ({ providers, csrfToken }) => {
    let [isAllValid, setValid] = useState(false);

    const validate = (isValid: boolean) => {
        setValid(isValid);
    };

    const signInSection = () => {
        const signInList = [
            <SignInForm validate={validate} key={0} />
        ];


        const list = signInList.concat(
            [
                <Button className={styles.secondaryButton} color="secondary" size="large" key={1} onClick={() => { signIn("google", { callbackUrl: `${window.location.host}/user/profile` }) }}>Sign in Google</Button>
            ]
        );

        console.log("LIST", list);

        return list;

    }


    return (<div className={styles.container}>
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
                <Image width={112} height={44} src="/logo_mindfire-white.jpg" />

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
                        signInSection()
                    )}
                </ThemeProvider>

                <p className={styles.byClickingTheButt}>
                    By clicking the button, I agree to the{" "}
                    <Link href="/signin/#">
                        <a rel="noopener noreferrer" className={styles.anchor}>
                            Terms of Services
              </a>
                    </Link>
            and
            <Link href="/signin/#">
                        <a rel="noopener noreferrer" className={styles.anchor}>
                            Privacy Policy
              </a>
                    </Link>
                </p>

                <div className={styles.alreadyAMemberSi}>
                    Don't have an account?{" "}
                    <Link href="/">
                        <a rel="noopener noreferrer" className={styles.anchor}>
                            Sign Up
              </a>
                    </Link>
                </div>
            </div>
        </div>
    </div>);
}

SignIn.getInitialProps = async (context) => {
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

export default SignIn;