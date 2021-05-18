import React, { useState, useEffect } from 'react';
import styles from './property.module.css';

import Link from "next/link";

import { ThemeProvider } from "@material-ui/core/styles";

import { theme } from "../../utils";
import { useSession, signOut } from "next-auth/client";

import PropertyForm from "../../components/PropertyForm";

import { getData } from "../../utils/firebase";


const Property = () => {
    const [session, loading] = useSession();
    const [profile, setProfile] = useState();

    useEffect(() => {
        getProfile();
    }, [session])

    const getProfile = () => {
        if (session) {

            getData(session.user.email).then((data) => {
                console.log("USER DATA", data)
                setProfile(data);
            }).catch((err) => {
                console.error("fetch error", err);
            })

        }
    }

    return (
        <div className={styles.property}>
            {loading && "...loading"}
            <ThemeProvider theme={theme}>
                {session && <PropertyForm profile={profile} />}
                {!session && <Link href="/">Click here to log in!</Link>}
            </ThemeProvider>
        </div>
    );
}
export default Property;