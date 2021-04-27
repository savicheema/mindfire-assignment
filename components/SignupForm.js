import React from "react";
import styles from "./signup-form.module.css";

import { AccountCircle, Mail, PhoneAndroid } from "@material-ui/icons";

import FormInput from "../components/FormInput";
import { Button } from "@material-ui/core";

class SignUpForm extends React.Component {
  render() {
    return (
      <div className={styles.signUpForm}>
        <div className={styles.title}>Sign up to TAYGO</div>
        <form className={styles.formGroup}>
          <FormInput
            icon={AccountCircle}
            name="full name"
            placeholder="John"
            ref={this.fullNameRef}
            regex={/^[a-zA-Z]([-']?[a-z]+)*( [a-zA-Z]([-']?[a-z]+)*)+$/}
          />

          <FormInput
            icon={Mail}
            name="Email"
            ref={this.emailRef}
            placeholder="example@site.com"
            regex={/(.+)@(.+){2,}\.(.+){2,}/}
          />

          <FormInput
            icon={PhoneAndroid}
            name="mobile number"
            placeholder="888-888-888"
            ref={this.mobileNumberRef}
            regex={/^[0-9-+\s]+$/}
          />

          <Button
            variant="contained"
            color="primary"
            className={styles.buttonFont}
            onClick={this.validateAllInputs}
          >
            Start with TAYGO
          </Button>
        </form>
      </div>
    );
  }
  constructor() {
    super();
    let isValid = false;
    this.state = { isValid };
    this.fullNameRef = React.createRef();
    this.emailRef = React.createRef();
    this.mobileNumberRef = React.createRef();
  }

  validateAllInputs = () => {
    const allPromises = [
      this.fullNameRef.current.validate(),
      this.emailRef.current.validate(),
      this.mobileNumberRef.current.validate(),
    ];

    Promise.all(allPromises).then((values) => {
      let reducedValid = values.reduce((value, currentValue) => {
        return value && currentValue;
      }, true);

      this.setState({ isValid: reducedValid }, () => {
        const { isValid } = this.state;
        const { validate } = this.props;
        validate(isValid);
      });
    });
  };
}
export default SignUpForm;
