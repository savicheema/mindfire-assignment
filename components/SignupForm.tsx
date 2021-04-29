import React, { Component } from "react";
import styles from "./signup-form.module.css";

import { Mail, PhoneAndroid } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import FormInput from "./utils/FormInput";
import { Button } from "@material-ui/core";



class SignUpForm extends Component<SignupFormProps, SingupFormState> {


  render() {
    return (
      <div className={styles.signUpForm}>
        <div className={styles.title}>Sign up to TAYGO</div>
        <form className={styles.formGroup}>
          <FormInput
            name="full name"
            placeholder="John"
            ref={this.fullNameRef}
            regex={/^[a-zA-Z]([-']?[a-z]+)*( [a-zA-Z]([-']?[a-z]+)*)+$/}
            icon={AccountCircleIcon}
          />

          <FormInput
            name="Email"
            ref={this.emailRef}
            placeholder="example@site.com"
            regex={/(.+)@(.+){2,}\.(.+){2,}/}
            icon={Mail}
          />

          <FormInput
            name="mobile number"
            placeholder="888-888-888"
            ref={this.mobileNumberRef}
            regex={/^[0-9-+\s]+$/}
            icon={PhoneAndroid}
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

  private fullNameRef = React.createRef<FormInput>();
  private emailRef = React.createRef<FormInput>();
  private mobileNumberRef = React.createRef<FormInput>();

  constructor(props: SignupFormProps) {
    super(props);
    let isValid = false;
    this.state = { isValid };

  }

  validateAllInputs = () => {
    const allPromises = [
      this.fullNameRef.current.validate(),
      this.emailRef.current.validate(),
      this.mobileNumberRef.current.validate(),
    ];

    Promise.all(allPromises).then((values: [boolean]) => {
      let reducedValid: boolean = this.inputValueReduce(values);

      this.setState({ isValid: reducedValid }, () => {
        const { isValid } = this.state;
        const { validate } = this.props;
        validate(isValid);
      });
    });
  };

  inputValueReduce = (inputValues: [boolean]): boolean => {
    let reducedValue: boolean = inputValues.reduce((value: boolean, currentValue: boolean): boolean => {
      return value && currentValue;
    }, true);
    return reducedValue;
  }

}

type SignupFormProps = {
  validate: Function,
}

type SingupFormState = {
  isValid: boolean
}

export default SignUpForm;

