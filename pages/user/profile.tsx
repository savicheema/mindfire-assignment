import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";

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


    const fetchUrl = new URL('http://localhost:3000/api/user/fetch');

    if (session) {

      getData(session.user.email).then((data) => {
        console.log("USER DATA", data)
        setProfile(data);
      }).catch((err) => {
        console.error("fetch error", err);

      })

    }


    // return () => {
    //   setProfile(undefined);
    // }
  }, [session])

  console.log("SESSION", session, profile);

  return (
    <div className={styles.profile}>
      {session && <button onClick={() => { signOut({ callbackUrl: "/" }) }}>Sign out</button>}
      <ThemeProvider theme={theme}>
        <ProfileForm profile={profile} />
      </ThemeProvider>
    </div>
  );
}
export default Profile;
