import React from "react";
import styles from "./personal-details.module.css";
import formStyles from "./form-style.module.css"

import FormInput, { FormInputHOC } from "../utils/FormInput";

class PersonalDetailsForm extends React.Component<PersonalDetailsFormProps, PersonalDetailsFormState> {
  render() {
    return (<div className={styles.personalDetailsForm}>
      <h3 className={styles.heading}>Personal Details</h3>
      <div className={formStyles.formDiv}>
        <FormInput
          name="full name"
          ref={this.nameRef}
          regex={/^[a-zA-Z]([-']?[a-z]+)*( [a-zA-Z]([-']?[a-z]+)*)+$/}
          placeholder="John Doe"
        />
        <FormInput
          name="Email"
          ref={this.emailRef}
          placeholder="example@site.com"
          regex={/(.+)@(.+){2,}\.(.+){2,}/}
        />
        <FormInput
          name="mobile number"
          ref={this.mobileRef}
          placeholder="+91 88888 88888"
          regex={/^[0-9-+\s]+$/}
        />
        <FormInput
          name="address"
          ref={this.addressRef}
          placeholder="433 Airport Blvd, Ste 106, Burl.."
          regex={/.*/}
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
  }
}

type PersonalDetailsFormProps = {};
type PersonalDetailsFormState = {}

export default PersonalDetailsForm;
