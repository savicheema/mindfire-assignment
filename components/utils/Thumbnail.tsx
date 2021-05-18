import React, { useState, useEffect } from 'react';
import styles from './thumbnail.module.css';

import Image from "next/image";


const Thumbnail = ({ image }) => {

    const [thumbnail, setThumbnail] = useState(undefined);

    const getPhoto = (filename) => {
        fetch(`/api/resource/s3?file=${filename}`)
            .then((response) => {
                console.log("RESPONSE", response.text);
                return response.text();
            })
            .then((data) => {
                console.log("PHOTO RESOURCE", data);
                setThumbnail(data);
            });
    };

    useEffect(() => {
        getPhoto(image)
    }, [thumbnail])

    if (!thumbnail) return null;

    return <div className={styles.thumbnail}>
        <img src={thumbnail} height="150" width="200" />
    </div>;
}

export default Thumbnail;