import React from 'react';
import styles from './signin-form.module.css';

import { Mail } from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';

import FormInput, { FormInputHOC } from "./utils/FormInput";

import { Button } from "@material-ui/core";



class SignInForm extends React.Component<SignInFormProps, SignInFormState> {
    render() {
        const { isError } = this.state;



        return (<div className={styles.signInForm}><div className={styles.title}>Sign In to MINDFIRE</div>
            {isError && <div className={styles.error}>Password do not match!</div>}
            <form className={styles.formGroup}>

                <FormInput
                    name="Email"
                    ref={this.emailRef}
                    placeholder="example@site.com"
                    regex={/(.+)@(.+){2,}\.(.+){2,}/}
                    icon={Mail}
                />

                <FormInput
                    name="Choose password"
                    ref={this.passwordRef}
                    placeholder="password"
                    regex={/(?=.*)/}
                    icon={LockIcon}
                    type="password"
                />

                <FormInput
                    name="Repeat password"
                    ref={this.confirmPasswordRef}
                    placeholder="password"
                    regex={/(?=.*)/}
                    icon={LockIcon}
                    type="password"
                />

                <Button
                    variant="contained"
                    color="primary"
                    className={styles.buttonFont}
                    onClick={this.validateAllInputs}
                >
                    Start with MINDFIRE
              </Button>
            </form>
        </div>);
    }
    private emailRef = React.createRef<FormInputHOC>();
    private passwordRef = React.createRef<FormInputHOC>();
    private confirmPasswordRef = React.createRef<FormInputHOC>();

    constructor(props: SignInFormProps) {
        super(props)

        let isValid = false;
        let isError = false;
        this.state = { isValid, isError };

    }

    validateAllInputs = () => {
        const allPromises = [
            this.emailRef.current.validate(),
            this.passwordRef.current.validate(),
            this.confirmPasswordRef.current.validate(),
        ];

        Promise.all(allPromises).then((values: [boolean]) => {
            let reducedValid: boolean = this.inputValueReduce(values);

            const { passwordRef, confirmPasswordRef } = this;

            if (passwordRef.current.value() !== confirmPasswordRef.current.value()) {
                this.setState({ isError: true });
                return;
            }

            this.setState({ isValid: reducedValid }, () => {
                const { isValid } = this.state;
                const { validate } = this.props;
                validate(isValid);
            });
        });
    }

    inputValueReduce = (inputValues: [boolean]): boolean => {
        let reducedValue: boolean = inputValues.reduce((value: boolean, currentValue: boolean): boolean => {
            return value && currentValue;
        }, true);
        return reducedValue;
    }
}


type SignInFormProps = {
    validate: Function
}

type SignInFormState = {
    isValid: boolean,
    isError: boolean
}

export default SignInForm;