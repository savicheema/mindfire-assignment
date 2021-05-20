import React, { useState, useEffect } from "react";

import styles from "./video.module.css";

const Video = ({ filename }) => {
  const [video, setVideo] = useState(undefined);

  const getVideo = (filename) => {
    fetch(`/api/resource/s3?file=${filename}`)
      .then((response) => {
        console.log("RESPONSE", response.text);
        return response.text();
      })
      .then((data) => {
        console.log("PHOTO RESOURCE", data);
        setVideo(data);
      });
  };

  useEffect(() => {
    getVideo(filename);
  }, [video]);

  if (!video) return null;

  return (
    <div className={styles.thumbnail}>
      <video height="150" width="200" controls>
        <source src={video} />
      </video>
    </div>
  );
};

export default Video;
