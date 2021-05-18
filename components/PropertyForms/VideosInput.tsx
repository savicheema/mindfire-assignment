import React from 'react';
import styles from './videos-input.module.css';

import formStyles from "../form-style.module.css"

import { Button } from "@material-ui/core";

import { UploadVideoThumb, Video } from "../utils";


class VideosInput extends React.Component<VideosInputProps, VideosInputState> {
    render() {
        const { property } = this.props;

        const { thumbRefs } = this.state;

        if (!property) return null;

        return (
            <div className={styles.videosInput}>
                <h2>Property Videos</h2>
                {property.userProperty && property.userProperty.videos &&
                    !!property.userProperty.videos.length && <div className={styles.attachedVideos}>
                        {property.userProperty.videos.map((video, index) => {
                            return <Video filename={video} />
                        })}
                    </div>
                }
                <div>
                    <form>
                        <input type="file"
                            onChange={this.onFileSelect}
                            className={formStyles.hiddenInput}
                            accept="video/*"
                            ref={this.inputRef}
                            multiple
                        />
                    </form>

                    <Button
                        color="secondary"
                        className={formStyles.formButton}
                        onClick={() => { this.inputRef.current.click() }}>Add Video</Button>
                </div>

                {!!thumbRefs.length && <div className={styles.uploadItems}>
                    {thumbRefs.map((thumb, index) => {
                        return <UploadVideoThumb key={thumb.key} ref={thumb.ref} profile={property} filename={thumb.key} removeFile={this.removeFile} />
                    })}
                </div>}
            </div>
        );
    }

    private inputRef = React.createRef<HTMLInputElement>();

    constructor(props: VideosInputProps) {
        super(props)

        this.state = {
            thumbRefs: []
        }
    }

    onFileSelect = async (e) => {
        const { thumbRefs } = this.state;

        Promise.all([...e.target.files].map((file) => {
            return { ref: React.createRef<typeof UploadVideoThumb>(), key: encodeURIComponent(file.name), file };
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


}


type VideosInputProps = {
    property: any
};
type VideosInputState = {
    thumbRefs: any[]
};

export default VideosInput;