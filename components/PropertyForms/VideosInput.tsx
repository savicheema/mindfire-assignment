import React from 'react';
import styles from './videos-input.module.css';

import formStyles from "../form-style.module.css"
import homeStyles from "../../styles/Home.module.css";

import { Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { styled } from "@material-ui/core/styles";

import { UploadVideoThumb, Video } from "../utils";

const StyledProgress = styled(LinearProgress)({
    height: "4px",
    width: "100%",
    margin: "4px 0",
});

class VideosInput extends React.Component<VideosInputProps, VideosInputState> {
    render() {
        const { property } = this.props;

        const { thumbRefs, isUploading } = this.state;

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
                        className={homeStyles.secondaryButton}
                        onClick={() => { this.inputRef.current.click() }}>Add Video</Button>
                </div>
                {!!thumbRefs.length && <div className={styles.uploadVideoHeader}>
                    <h4>Videos to be uploaded</h4>
                    <Button color="secondary" variant="outlined" className={styles.videosUploadButton} onClick={this.uploadAll} >Upload all</Button>
                </div>}
                {!!thumbRefs.length && <div className={styles.uploadVideoHeader}>
                    <h4>Videos to be via worker</h4>
                    <Button color="secondary" variant="outlined" className={styles.videosUploadButton} onClick={this.uploadAllWorker}>Upload all worker</Button>
                </div>}
                {!!thumbRefs.length && <div>{isUploading && <StyledProgress />}</div>}
                {!!thumbRefs.length && <div className={styles.uploadItems}>
                    {thumbRefs.map((thumb, index) => {
                        return <UploadVideoThumb key={thumb.key} ref={thumb.ref} profile={property} filename={thumb.key} removeFile={this.removeFile} />
                    })}
                </div>}
            </div>
        );
    }

    private inputRef = React.createRef<HTMLInputElement>();
    private worker = undefined;

    constructor(props: VideosInputProps) {
        super(props)


        this.state = {
            thumbRefs: [],
            isUploading: false
        }

        this.worker = new Worker('/workers/allworker.js');
    }

    componentDidMount() {
        this.worker.onmessage = (evt) => {
            this.setState({ isUploading: false }, () => {
                alert(`WebWorker Response => ${evt.data}`);
            })
        }

        // this.worker.postMessage(1000);

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

    uploadAll = () => {
        const { thumbRefs } = this.state;

        thumbRefs.forEach((thumbRef) => {
            thumbRef.ref.current.uploadVideo();
        })
    }

    uploadAllWorker = () => {

        const { thumbRefs } = this.state;
        console.log("WORKER", this.worker)


        this.setState({ isUploading: true }, () => {
            const files = thumbRefs.map((ref) => ref.file);
            this.worker.postMessage({ files })
        })
    }

}


type VideosInputProps = {
    property: any
};
type VideosInputState = {
    thumbRefs: any[],
    isUploading: boolean
};

export default VideosInput;