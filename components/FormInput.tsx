import React, { RefObject } from "react";
import styles from "./form-input.module.css";

import { TextField, InputAdornment, SvgIconTypeMap } from "@material-ui/core";

import { capitalize } from "../utils";
import { SvgIconComponent } from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/styles";

type FormInputProps = {
  placeholder: string,
  name: String,
  regex: RegExp,
  icon: SvgIconComponent,
}

type FormInputState = {
  inputValue: string,
  isError: boolean,
  isFocused: boolean
}
class FormInput extends React.Component<FormInputProps, FormInputState> {
  render() {
    const { inputValue, isError, isFocused } = this.state;
    
    let iconClass;
    if(!isError) {
      iconClass = isFocused?styles.focusIcon:styles.normalIcon;
    } else {
      iconClass = styles.errorIcon;
    }


    return (
      <div className={styles.formInput}>
        <TextField
          placeholder={this.props.placeholder}
          label={this.props.name}
          className={styles.textField}
          classes={{ root: styles.root }}
          InputLabelProps={{ className: styles.label }}
          InputProps={{
            
            startAdornment: (
              <InputAdornment position="start">
                {<this.props.icon className={iconClass}/>}
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
      </div>
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

    this.setState({isFocused: true});
    // this.props.iconRef.current.style.color = "rgba(0, 214, 123, 0.9)";
  };

  onBlur = () => {
    // this.props.iconRef.current.style.color = "#ddd";
    this.setState({isFocused: false});
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

    let helperText;
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

export default FormInput;
