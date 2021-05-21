import React from "react";
import styles from "./upload-video-thumb.module.css";
import uploadStyles from "./upload.module.css";

import { styled } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import { updateData } from "../../utils/firebase";

const StyledProgress = styled(LinearProgress)({
  height: "4px",
  width: "100%",
  margin: "4px 0",
});

class UploadVideoThumb extends React.Component {
  render() {
    // const { profile, filename, removeFile } = this.props;
    const { isFileSet, isUploading } = this.state;

    return (
      <div className={styles.uploadVideoThumb}>
        {(!isFileSet || isUploading) && <StyledProgress />}

        <div className={uploadStyles.thumbArea}>
          <video width="200" height="150" ref={this.videoRef}>
            <source ref={this.videoSourceRef} />
          </video>
          <div className={uploadStyles.uploadButtons}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              className={uploadStyles.button}
              onClick={this.uploadVideo}
            >
              Upload
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              className={uploadStyles.button}
              onClick={this.uploadVideoOnWorker}
            >
              Worker Upload
            </Button>

            <Button
              color="secondary"
              size="small"
              className={uploadStyles.button}
              onClick={this.remove}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      isFileSet: false,
      isUploading: false,
    };

    this.videoSourceRef = React.createRef();
    this.videoRef = React.createRef();

    this.worker = new Worker("/workers/worker.js");
  }

  componentDidMount() {
    this.worker.onmessage = (evt) => alert(`WebWorker Response => ${evt.data}`);
  }

  uploadVideo = () => {
    const { file } = this.state;
    if (!file) {
      console.error("NO FILE TO UPLOAD");
      return;
    }

    this.setState({ isUploading: true }, async () => {
      const propertyFilename = `property/${encodeURIComponent(file.name)}`;
      const res = await fetch(`/api/upload/s3?file=${propertyFilename}`);

      const { url, fields } = await res.json();

      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { profile } = this.props;

      console.log("UPLOAD PROPERTY VIDEO PROFILE", profile);

      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (upload.ok) {
        console.log("Uploaded successfully!", upload, url);

        if (profile.userProperty && profile.userProperty.videos) {
          profile.userProperty.videos.push(propertyFilename);
          updateData(profile.email, { ...profile });
        } else if (!profile.userProperty) {
          const property = {
            videos: [],
          };

          property.videos.push(propertyFilename);

          profile.userProperty = property;
          updateData(profile.email, { ...profile });
        } else if (!profile.userProperty.videos) {
          const videos = [];
          videos.push(propertyFilename);

          profile.userProperty.videos = videos;

          updateData(profile.email, { ...profile });
        } else {
          console.error("Don't know what to upload");
        }
        // this.getPhoto(propertyFilename);
      } else {
        console.error("Upload failed.");
      }

      this.setState({ isUploading: false });
    });
  };

  uploadVideoOnWorker = () => {
    const { file } = this.state;
    const { profile } = this.props;

    this.worker.postMessage({ file, profile });
  };

  setFile = (file) => {
    this.setState({ file }, async () => {
      const videoUrl = URL.createObjectURL(file);
      this.videoSourceRef.current.src = videoUrl;
      this.setState({ isFileSet: true }, () => {
        this.videoRef.current.load();
      });
    });
  };

  remove = () => {
    this.setState({ file: undefined }, () => {
      const { removeFile, filename } = this.props;
      removeFile(filename);
    });
  };
}
export default UploadVideoThumb;
