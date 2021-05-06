import React from "react";
import styles from "./profile.module.css";

import Link from "next/link";

import ProfileForm from "../../components/ProfileForm";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../utils";


const Profile = () => (
  <div className={styles.profile}>
    <Link href="/" >Home</Link>
    <ThemeProvider theme={theme}>
      <ProfileForm />
    </ThemeProvider>
  </div>
);
export default Profile;
