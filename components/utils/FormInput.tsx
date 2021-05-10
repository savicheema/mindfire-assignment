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
    height: "7.7vh",
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
    const { inputValue, isError, iconClass } = this.state;

    const { classes } = this.props;

    const inputAdornmentIcon = () => {
      if (this.props.icon) {
        return (<InputAdornment position="start">
          {iconClass !== "" && <this.props.icon className={iconClass}
            fontSize="small"
          />}
        </InputAdornment>)
      }

      return " "
    }

    return (
      <TextField
        placeholder={this.props.placeholder}
        label={this.props.name}
        classes={classes}
        InputLabelProps={{ className: styles.label }}
        InputProps={{
          type: this.props.type,
          startAdornment: inputAdornmentIcon()
        }}
        select={this.props.type === "select"}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        error={isError}
        helperText={capitalize(this.getHelperText())}
        value={inputValue}
        onChange={this.updateValue}
        inputProps={{ value: inputValue, ref: this.inputRef }}
        disabled={this.props.disabled}
      >{this.props.children}</TextField>
    );
  }

  private inputRef = React.createRef<HTMLInputElement>();

  constructor(props: FormInputProps) {
    super(props);
    let inputValue = "";
    let isError = false;
    let isFocused = false;
    let iconClass = "";
    this.state = { inputValue, isError, isFocused, iconClass };
  }

  componentDidMount() {
    this.getIconClass();

    if (this.props.value)
      this.setState({ inputValue: this.props.value })
  }

  value = () => {
    return this.inputRef.current.value;
  }

  updateValue = (e) => {
    console.log(e.target.value);

    const { isError } = this.state;
    if (e.target.value && isError) {
      this.setState({ isError: false }, this.getIconClass);
    }

    if (this.props.formatOnChange) {
      const { formatOnChange } = this.props;
      const formattedValue = formatOnChange(e.target.value);

      if (formattedValue === null) return;

      this.setState({ inputValue: formattedValue });
      return;
    }


    this.setState({ inputValue: e.target.value });
  };

  onFocus = () => {
    const { isError } = this.state;

    if (isError) return;

    this.setState({ isFocused: true }, this.getIconClass);
  };

  onBlur = () => {
    this.setState({ isFocused: false }, this.getIconClass);
  };

  validate = () => {
    return new Promise((resolve) => {
      const { inputValue } = this.state;
      const { regex } = this.props;

      if (inputValue && regex.test(inputValue)) {
        this.setState({ isError: false }, this.getIconClass);
        resolve(true);
        return;
      }

      this.setState({ isError: true }, () => {
        this.getIconClass();
        resolve(false);
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

  getIconClass = () => {
    let { isError, isFocused, iconClass } = this.state;

    if (!isError) {
      iconClass = isFocused ? styles.focusIcon : styles.normalIcon;
    } else {
      iconClass = styles.errorIcon;
    }

    this.setState({ iconClass });


  }
}

type FormInputProps = {
  placeholder: string,
  name: String,
  regex: RegExp,
  icon?: SvgIconComponent,
  type?: string,
  ref: RefObject<FormInputHOC>,
  classes: ClassNameMap,
  formatOnChange?: Function,
  value?: string,
  disabled?: boolean
}

type FormInputState = {
  inputValue: string,
  isError: boolean,
  isFocused: boolean,
  iconClass: string
}

export default withStyles(style)(FormInputHOC);
