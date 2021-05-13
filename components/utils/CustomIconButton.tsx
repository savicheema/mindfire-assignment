import React from 'react';
import styles from './custom-icon.module.css';

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    root: {
        position: "absolute",
        bottom: "8px",
        right: "-8px",
    },
});

const CustomIconButton = ({ children, action }) => {
    const classes = useStyles();

    return <IconButton
        color="secondary"
        aria-label="upload picture"
        component="span"
        size="medium"
        classes={classes}
        onClick={action}
    >
        {children}</IconButton>
}

export default CustomIconButton;
