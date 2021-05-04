import React, { RefObject } from "react";
import styles from "./form-input.module.css";

import { TextField, InputAdornment } from "@material-ui/core";

import { capitalize } from "../../utils";
import { SvgIconComponent } from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";



const style = {
  root: {
    maxWidth: "420px",
    height: "7vh",
    margin: "12px 0",

    '& label': {
      fontSize: "18px",
      textTransform: "capitalize",
      color: "black"
    },
    '& .MuiInputBase-root': {
      marginTop: "24px",
    },
    '& .MuiInputBase-root:before': {
      borderBottom: "1px solid #CDD3DB"
    },
  }
}

export class FormInputHOC extends React.Component<FormInputProps, FormInputState> {
  render() {
    const { inputValue, isError, isFocused } = this.state;

    const { classes } = this.props;

    let iconClass: string;
    if (!isError) {
      iconClass = isFocused ? styles.focusIcon : styles.normalIcon;
    } else {
      iconClass = styles.errorIcon;
    }

    return (
      <TextField
        placeholder={this.props.placeholder}
        label={this.props.name}
        classes={classes}
        InputLabelProps={{ className: styles.label }}
        InputProps={{
          type: this.props.type,
          startAdornment: (
            <InputAdornment position="start">
              {<this.props.icon className={iconClass} />}
            </InputAdornment>
          ),
        }}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        error={isError}
        helperText={capitalize(this.getHelperText())}
        value={inputValue}
        onChange={this.updateValue}
        inputProps={{ value: inputValue, ref: this.inputRef }}
      />
    );
  }

  private inputRef = React.createRef<HTMLInputElement>();

  constructor(props: FormInputProps) {
    super(props);
    let inputValue = "";
    let isError = false;
    let isFocused = false;
    this.state = { inputValue, isError, isFocused };
  }

  value = () => {
    return this.inputRef.current.value;
  }

  updateValue = (e) => {
    console.log(e.target.value);

    const { isError } = this.state;
    if (e.target.value && isError) {
      this.setState({ isError: false });
      // this.props.iconRef.current.style.color = "rgba(0, 214, 123, 0.9)";
    }

    this.setState({ inputValue: e.target.value });
  };

  onFocus = () => {
    const { isError } = this.state;

    if (isError) return;

    this.setState({ isFocused: true });
    // this.props.iconRef.current.style.color = "rgba(0, 214, 123, 0.9)";
  };

  onBlur = () => {
    // this.props.iconRef.current.style.color = "#ddd";
    this.setState({ isFocused: false });
  };

  validate = () => {
    return new Promise((resolve) => {
      const { inputValue } = this.state;
      const { regex } = this.props;

      if (inputValue && regex.test(inputValue)) {
        this.setState({ isError: false });
        resolve(true);
        return;
      }

      this.setState({ isError: true }, () => {
        resolve(false);
        // this.props.iconRef.current.style.color = "red";
      });
    });
  };

  getHelperText = () => {
    const { isError, inputValue } = this.state;

    if (!isError) return "";

    let helperText: string;
    switch (inputValue) {
      case "": {
        helperText = `${this.props.name} is required`;
        break;
      }
      default: {
        const { name, regex } = this.props;

        if (!regex.test(inputValue)) {
          helperText = `${name} is not valid`;
          return helperText;
        }
      }
    }

    return helperText;
  };
}

type FormInputProps = {
  placeholder: string,
  name: String,
  regex: RegExp,
  icon: SvgIconComponent,
  type?: string,
  ref: RefObject<FormInputHOC>,
  classes: ClassNameMap
}

type FormInputState = {
  inputValue: string,
  isError: boolean,
  isFocused: boolean
}

export default withStyles(style)(FormInputHOC);
