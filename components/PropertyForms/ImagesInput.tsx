import React from 'react';
import styles from './images-input.module.css';

import formStyles from "../form-style.module.css"

import { Button } from "@material-ui/core";

import { UploadImageThumb } from "../utils";

class ImagesInput extends React.Component<ImagesInputProps, ImagesInputState> {
    render() {
        const { thumbRefs } = this.state;

        const { property } = this.props;

        console.log("IMAGE INPUT PROFILE", property)

        return (<div className={styles.imagesInput} ref={this.imageGalleryRef}>
            <h2>Property Photos</h2>
            <div className={styles.formDiv}>
                <form>
                    <input type="file"
                        onChange={this.onFileSelect}
                        className={formStyles.hiddenInput}
                        accept="image/png, image/jpeg"
                        ref={this.inputRef}
                    />
                </form>

                <Button
                    color="secondary"
                    className={formStyles.formButton}
                    onClick={() => { this.inputRef.current.click() }}>Add Photo</Button>
            </div>
            {!!thumbRefs.length && thumbRefs.map((thumb, index) => {
                return <UploadImageThumb key={thumb.key} ref={thumb.ref} profile={property} filename={thumb.key} removeFile={this.removeFile} />
            })}

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

        const thumbRef = { ref: React.createRef<UploadImageThumb>(), key: encodeURIComponent(e.target.files[0].name) };

        const { thumbRefs } = this.state;

        thumbRefs.push(thumbRef);

        this.setState({ thumbRefs }, () => {
            thumbRef.ref.current.setFile(e.target.files[0]);
        });

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
    thumbRefs: [any?]
};

export default ImagesInput;