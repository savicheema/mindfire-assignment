import React from 'react';
import styles from './images-input.module.css';

import formStyles from "../form-style.module.css"
import homeStyles from "../../styles/Home.module.css";

import { Button } from "@material-ui/core";

import { UploadImageThumb, Thumbnail } from "../utils";

class ImagesInput extends React.Component<ImagesInputProps, ImagesInputState> {
    render() {
        const { thumbRefs } = this.state;

        const { property } = this.props;

        console.log("IMAGE INPUT PROFILE", property)

        if (!property) return "";

        return (<div className={styles.imagesInput} ref={this.imageGalleryRef}>
            <h2>Property Photos</h2>
            {property.userProperty && property.userProperty.images &&
                !!property.userProperty.images.length && <div className={styles.attachedPhotos}>
                    {property.userProperty.images.map((image, index) => {
                        return <Thumbnail image={image} key={index} />
                    })}
                </div>
            }
            <div className={styles.formDiv}>
                <form>
                    <input type="file"
                        onChange={this.onFileSelect}
                        className={formStyles.hiddenInput}
                        accept="image/png, image/jpeg"
                        ref={this.inputRef}
                        multiple
                    />
                </form>

                <Button
                    color="secondary"
                    className={homeStyles.secondaryButton}
                    onClick={() => { this.inputRef.current.click() }}>Add Photo</Button>
            </div>
            {!!thumbRefs.length && <div className={styles.uploadItems}>
                {thumbRefs.map((thumb, index) => {
                    return <UploadImageThumb key={thumb.key} ref={thumb.ref} profile={property} filename={thumb.key} removeFile={this.removeFile} />
                })}
            </div>}

        </div>);
    }
    private inputRef = React.createRef<HTMLInputElement>();
    private imageGalleryRef = React.createRef<HTMLDivElement>();

    constructor(props: ImagesInputProps) {
        super(props)

        this.state = {
            thumbRefs: []
        };
    }

    onFileSelect = async (e) => {
        const { thumbRefs } = this.state;

        Promise.all([...e.target.files].map((file) => {
            return { ref: React.createRef<UploadImageThumb>(), key: encodeURIComponent(file.name), file };
        })).then((newRefs: any) => {

            console.log("THUMB REFS", thumbRefs);
            this.setState({ thumbRefs: thumbRefs.concat(newRefs) }, () => {
                const { thumbRefs } = this.state;
                thumbRefs.forEach((thumbRef) => thumbRef.ref.current.setFile(thumbRef.file));
            });
        })





    }

    removeFile = (filename) => {
        const { thumbRefs } = this.state;

        const thumb = thumbRefs.find((thumb) => {
            return thumb.key === filename;
        })

        const index = thumbRefs.indexOf(thumb);

        thumbRefs.splice(index, 1);

        this.setState({ thumbRefs });
    }

    findFileName = () => {

    }
}

type ImagesInputProps = {
    property: any
};
type ImagesInputState = {
    thumbRefs: any[]
};

export default ImagesInput;