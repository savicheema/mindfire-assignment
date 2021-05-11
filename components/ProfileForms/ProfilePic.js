import { Button } from "@material-ui/core";
import React from "react";
import styles from "./profile-pic.module.css";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { signOut } from "next-auth/client";

const ProfilePic = ({ profile }) => {
  if (!profile) return <div className={styles.profilePic}>ProfilePic</div>;
  else
    return (
      <div className={styles.container}>
        <img
          className={styles.profilePic}
          src={profile.image}
          alt="social profile pic"
        />
        <Button
          color="secondary"
          size="medium"
          startIcon={<PowerSettingsNewIcon />}
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign out
        </Button>
      </div>
    );
};
export default ProfilePic;
