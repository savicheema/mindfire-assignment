import React from "react";
import styles from "./profile-pic.module.css";
const ProfilePic = ({ profile }) => {
  if (!profile) return <div className={styles.profilePic}>ProfilePic</div>;
  else
    return (
      <img
        className={styles.profilePic}
        src={profile.image}
        alt="social profile pic"
      />
    );
};
export default ProfilePic;
