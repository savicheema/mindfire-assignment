import React from "react";
import styles from "./upload-image-thumb.module.css";
import uploadStyles from "./upload.module.css";

import { Button } from "@material-ui/core";

import { updateData } from "../../utils/firebase";
import { styled } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";

const StyledProgress = styled(LinearProgress)({
  height: "4px",
  width: "100%",
  margin: "4px 0",
});

class UploadImageThumb extends React.Component {
  render() {
    const { profile } = this.props;

    const { isFileSet, isUploading } = this.state;

    console.log("UPLOAD THUMB", profile);

    return (
      <div className={styles.uploadImageThumb}>
        {(!isFileSet || isUploading) && <StyledProgress />}
        <div className={uploadStyles.thumbArea}>
          <canvas height="150" width="200" ref={this.canvasRef}></canvas>
          <div className={uploadStyles.uploadButtons}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              className={uploadStyles.button}
              onClick={this.uploadPhoto}
            >
              Upload
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
      file: undefined,
      isFileSet: false,
      isUploading: false,
    };

    this.canvasRef = React.createRef();
    this.uploadRef = React.createRef();
    this.removeRef = React.createRef();
  }

  setFile = (file) => {
    this.setState({ file }, async () => {
      const bitmapImage = await createImageBitmap(file);
      const ctx = this.canvasRef.current.getContext("2d");
      ctx.drawImage(bitmapImage, 0, 0);

      this.setState({ isFileSet: true });
    });
  };

  uploadPhoto = () => {
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

      console.log("UPLOAD PROPERTY IMAGE PROFILE", profile);

      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (upload.ok) {
        console.log("Uploaded successfully!", upload, url);

        if (profile.userProperty && profile.userProperty.images) {
          profile.userProperty.images.push(propertyFilename);
          updateData(profile.email, { ...profile });
        } else if (!profile.userProperty) {
          const property = {
            images: [],
          };

          property.images.push(propertyFilename);

          profile.userProperty = property;
          updateData(profile.email, { ...profile });
        } else if (!profile.userProperty.images) {
          const images = [];
          images.push(propertyFilename);

          profile.userProperty.images = images;

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

  getPhoto = (filename) => {
    fetch(`/api/resource/s3?file=${filename}`)
      .then((response) => {
        console.log("RESPONSE", response.text);
        return response.text();
      })
      .then((data) => {
        console.log("PHOTO RESOURCE", data);
      });
  };

  remove = () => {
    this.setState({ file: undefined }, () => {
      const { removeFile, filename } = this.props;
      removeFile(filename);
    });
  };
}

export default UploadImageThumb;
