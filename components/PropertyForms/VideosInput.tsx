import React from 'react';
import styles from './videos-input.module.css';

import formStyles from "../form-style.module.css"

import { Button } from "@material-ui/core";

const VideosInput = () => <div className={styles.videosInput}>
    <h2>Property Videos</h2>
    <div className={formStyles.formDiv}>
        <form>
            <input type="file"
                onChange={() => { console.log("1 image") }}
                className={formStyles.hiddenInput}
                accept="image/png, image/jpeg"
            />
        </form>

        <Button
            color="secondary"
            className={formStyles.formButton}
            onClick={() => { console.log("Add more images!") }}>Add Video</Button>
    </div></div>;
export default VideosInput;