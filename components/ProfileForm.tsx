import React from "react";
import styles from "./profile-form.module.css";
import { Button } from "@material-ui/core";


import {
  ProfilePic,
  PersonalDetailsForm,
  AccountDetailsForm,
} from "./ProfileForms";

const ProfileForm = () => (
  <form className={styles.profileForm}>
    <ProfilePic />
    <PersonalDetailsForm />
    <AccountDetailsForm />

    <div className={styles.profileFormButtons}>

      <Button
        variant="contained"
        color="primary"
        className={styles.buttonFont}
      >
        Save
              </Button>

      <Button
        variant="contained"
        color="secondary"
        className={styles.buttonFont}
      >
        Cancel
              </Button>
    </div>
  </form>
);
export default ProfileForm;
