import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import Link from "next/link";

import ProfileForm from "../../components/ProfileForm";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../utils";
import { getData } from "../../utils/firebase";

import { useSession, signOut } from "next-auth/client";


const Profile = () => {
  // useScript("https://apis.google.com/js/platform.js", () => { gapiApp.setGappiApp(); })

  const [profile, setProfile] = useState();

  const [session, loading] = useSession();

  useEffect(() => {

    if (session) {

      getData(session.user.email).then((data) => {
        console.log("USER DATA", data)
        setProfile(data);
      }).catch((err) => {
        console.error("fetch error", err);
      })

    }

  }, [session])

  const profileClass = session ? styles.profile : styles.logIn;

  return (
    <div className={profileClass}>
      {loading && "...loading"}
      <ThemeProvider theme={theme}>
        {session && <ProfileForm profile={profile} />}
        {!session && <Link href="/">Click here to log in!</Link>}
      </ThemeProvider>
    </div>
  );
}
export default Profile;
