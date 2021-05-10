import React from "react";
import styles from "./personal-details.module.css";
import formStyles from "./form-style.module.css"

import FormInput, { FormInputHOC } from "../utils/FormInput";

class PersonalDetailsForm extends React.Component<PersonalDetailsFormProps, PersonalDetailsFormState> {
  render() {
    const { personal } = this.props;

    console.log("PERSONAL", personal);

    if (!personal) return "";

    return (<div className={styles.personalDetailsForm}>
      <h3 className={styles.heading}>Personal Details</h3>
      <div className={formStyles.formDiv}>
        <FormInput
          name="full name"
          ref={this.nameRef}
          regex={/^[a-zA-Z]([-']?[a-z]+)*( [a-zA-Z]([-']?[a-z]+)*)+$/}
          placeholder="John Doe"
          value={personal.name}
        />
        <FormInput
          name="Email"
          ref={this.emailRef}
          placeholder="example@site.com"
          regex={/(.+)@(.+){2,}\.(.+){2,}/}
          value={personal.email}
        />
        <FormInput
          name="mobile number"
          ref={this.mobileRef}
          placeholder="+91 88888 88888"
          regex={/^[0-9-+\s]+$/}
          value={personal.mobile}
        />
        <FormInput
          name="address"
          ref={this.addressRef}
          placeholder="433 Airport Blvd, Ste 106, Burl.."
          regex={/.*/}
          value={personal.address}
        />
      </div>
    </div>);
  }
  private nameRef = React.createRef<FormInputHOC>();
  private emailRef = React.createRef<FormInputHOC>();
  private mobileRef = React.createRef<FormInputHOC>();
  private addressRef = React.createRef<FormInputHOC>();

  constructor(props: PersonalDetailsFormProps) {
    super(props)

    let isValid = false;
    this.state = { isValid };
  }

  // validate = () => {
  //   return new Promise(async (resolve) => {
  //     await this.nameRef.current.validate();
  //   });
  // }

  validateAllInputs = () => {
    const allPromises = [
      this.mobileRef.current.validate(),
      this.addressRef.current.validate(),
    ];

    return new Promise<{ personalFormValid: boolean, personalData: Object }>((resolve) => {
      Promise.all(allPromises).then((values: [boolean]) => {
        let reducedValid: boolean = this.inputValueReduce(values);

        this.setState({ isValid: reducedValid }, () => {
          const { isValid } = this.state;
          // const { submit } = this.props;
          // submit(isValid);
          resolve({
            personalFormValid: isValid, personalData: {
              mobile: this.mobileRef.current.value(),
              address: this.addressRef.current.value()
            }
          })
        });
      });
    })
  }

  inputValueReduce = (inputValues: [boolean]): boolean => {
    let reducedValue: boolean = inputValues.reduce((value: boolean, currentValue: boolean): boolean => {
      return value && currentValue;
    }, true);
    return reducedValue;
  }
}

type PersonalDetailsFormProps = {
  personal: any
  submit?: Function
};
type PersonalDetailsFormState = {
  isValid: boolean
}

export default PersonalDetailsForm;
