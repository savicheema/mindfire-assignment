import React from 'react';
import styles from './upload-image-thumb.module.css';

import { Button } from "@material-ui/core";

import { updateData } from "../../utils/firebase";


class UploadImageThumb extends React.Component<UploadImageThumbProps, UploadImageThumbState> {
    render() {

        const { profile } = this.props;

        console.log("UPLOAD THUMB", profile)

        return (<div className={styles.uploadImageThumb}>
            <canvas height="150" width="200" ref={this.canvasRef}></canvas>
            <div className={styles.buttons}>
                <Button color="primary" variant="contained" size="small" className={styles.button} onClick={this.uploadPhoto}>Upload</Button>
                <Button color="secondary" size="small" className={styles.button}>Remove</Button>
            </div>
        </div>);
    }
    private canvasRef = React.createRef<HTMLCanvasElement>();
    private uploadRef = React.createRef<HTMLButtonElement>();
    private removeRef = React.createRef<HTMLButtonElement>();

    constructor(props: UploadImageThumbProps) {
        super(props)

        this.state = {
            file: undefined
        }
    }

    setFile = (file) => {
        this.setState({ file }, async () => {
            const bitmapImage = await createImageBitmap(file);
            const ctx = this.canvasRef.current.getContext('2d');
            ctx.drawImage(bitmapImage, 0, 0);
        })
    }

    uploadPhoto = async () => {
        const { file } = this.state;
        if (!file) {
            console.error("NO FILE TO UPLOAD");
            return;
        }

        const propertyFilename = `property/${encodeURIComponent(file.name)}`;
        const res = await fetch(`/api/upload/s3?file=${propertyFilename}`);

        const { url, fields } = await res.json();

        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const { profile } = this.props;

        console.log("UPLOAD PROPERTY IMAGE PROFILE", profile)

        const upload = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (upload.ok) {
            console.log("Uploaded successfully!", upload, url);
            updateData(profile.email, { ...profile, propertyFilename });
            this.getPhoto(propertyFilename);
        } else {
            console.error("Upload failed.");
        }
    }

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
}

type UploadImageThumbProps = {
    profile: any
};
type UploadImageThumbState = {
    file: any
};

export default UploadImageThumb;