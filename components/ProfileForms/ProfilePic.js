import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "./profile-pic.module.css";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { signOut } from "next-auth/client";
import { updateData } from "../../utils/firebase";

const ProfilePic = ({ profile }) => {
  if (!profile) return <div className={styles.profilePic}>ProfilePic</div>;
  else {
    const [profilePic, setProfilePic] = useState(profile.image);

    const uploadPhoto = async (e) => {
      const file = e.target.files[0];
      const filename = encodeURIComponent(file.name);
      const res = await fetch(`/api/upload/s3?file=${filename}`);
      const { url, fields } = await res.json();
      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (upload.ok) {
        console.log("Uploaded successfully!", upload, url);
        updateData(profile.email, { ...profile, filename });
        getPhoto(filename);
      } else {
        console.error("Upload failed.");
      }
    };

    const getPhoto = (filename) => {
      fetch(`/api/resource/s3?file=${filename}`)
        .then((response) => {
          console.log("RESPONSE", response.text);
          return response.text();
        })
        .then((data) => {
          console.log("PHOTO RESOURCE", data);
          setProfilePic(data);
        });
    };

    useEffect(() => {
      if (profile.filename) getPhoto(profile.filename);
    }, [profile.filename]);

    return (
      <div className={styles.container}>
        <div className={styles.profileUpload}>
          <img
            className={styles.profilePic}
            src={profilePic}
            alt="social profile pic"
          />
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>

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
  }
};
export default ProfilePic;
