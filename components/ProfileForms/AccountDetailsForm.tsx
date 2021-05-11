import React from "react";
import styles from "./account-details.module.css";
import formStyles from "./form-style.module.css"

import FormInput, { FormInputHOC } from "../utils/FormInput";
import MenuItem from '@material-ui/core/MenuItem';


class AccountDetailsForm extends React.Component<AccountDetailsFormProps, AccountDetailsFormState> {

  render() {
    const { account } = this.props;

    if (!account) return "";

    return (<div className={styles.accountDetailsForm}>
      <h3 className={styles.heading}>Account Details</h3>
      <div className={formStyles.formDiv}>
        <FormInput
          name="purpose"
          ref={this.purposeRef}
          placeholder="example@site.com"
          regex={/[a-zA-Z]*/}
          type="select"
          value={account.purpose}
        >[
          <MenuItem key={0} value={"Primary Residence"}>Primary Residence</MenuItem>,
          <MenuItem key={1} value={"Secondary Home"}>Secondary Home</MenuItem>,
          <MenuItem key={2} value={"For Rent"}>For Rent</MenuItem>
          ]
        </FormInput>

        <FormInput
          name="Property Type"
          ref={this.propertyTypeRef}
          placeholder="example@site.com"
          regex={/[a-zA-Z]*/}
          type="select"
          value={account.property}
        >[
          <MenuItem key={0} value={"Immediately: Signed a Purchase Agreement"}>Immediately: Signed a Purchase Agreement</MenuItem>,
          <MenuItem key={1} value={"ASAP: Found a House/Offer Pending"}>ASAP: Found a House/Offer Pending</MenuItem>,
          <MenuItem key={2} value={"Within 30 Days"}>Within 30 Days</MenuItem>,
          <MenuItem key={3} value={"2 - 3 Months"}>2 - 3 Months</MenuItem>,
          <MenuItem key={4} value={"3 - 6 Months"}>3 - 6 Months</MenuItem>,
          <MenuItem key={5} value={"6+ Months"}>6+ Months</MenuItem>,
          <MenuItem key={6} value={"No Time Frame"}>No Time Frame</MenuItem>,
          ]
        </FormInput>

        <FormInput
          name="loan type"
          ref={this.loanTypeRef}
          placeholder="example@site.com"
          regex={/[a-zA-Z]*/}
          type="select"
          value={account.loan}
        >[
          <MenuItem key={0} value={"Home Purchase"}>Home Purchase</MenuItem>,
          <MenuItem key={1} value={"Home Refinance"}>Home Refinance</MenuItem>,
          <MenuItem key={2} value={"Cash-out Refinance"}>Cash-out Refinance</MenuItem>
          ]
        </FormInput>

        <FormInput
          name="credit score"
          ref={this.creditScoreRef}
          placeholder="example@site.com"
          regex={/[a-zA-Z]*/}
          type="select"
          value={account.credit}
        >[
          <MenuItem key={0} value={"Excellent (720+)"}>Excellent (720+)</MenuItem>,
          <MenuItem key={1} value={"Good (660-719)"}>Good (660-719)</MenuItem>,
          <MenuItem key={2} value={"Average (620-659)"}>Average (620-659)</MenuItem>,
          <MenuItem key={3} value={"Below Average (580-619)"}>Below Average (580-619)</MenuItem>,
          <MenuItem key={4} value={"Poor (under 579)"}>Poor (under 579)</MenuItem>,
          ]
        </FormInput>
        <FormInput
          name="Job"
          ref={this.jobRef}
          placeholder="Software Engineer"
          regex={/.*/}
          value={account.job}
        />
        <FormInput
          name="Income"
          ref={this.incomeRef}
          placeholder="10000"
          regex={/d*/}
          value={account.income}
        />
        <FormInput
          name="Current Challenges"
          ref={this.challengeRef}
          placeholder=""
          regex={/.*/}
          value={account.challenge}
        />
      </div>
    </div>);
  }
  private purposeRef = React.createRef<FormInputHOC>();
  private propertyTypeRef = React.createRef<FormInputHOC>();
  private loanTypeRef = React.createRef<FormInputHOC>();
  private creditScoreRef = React.createRef<FormInputHOC>();
  private jobRef = React.createRef<FormInputHOC>();
  private incomeRef = React.createRef<FormInputHOC>();
  private challengeRef = React.createRef<FormInputHOC>();

  constructor(props: AccountDetailsFormProps) {
    super(props)

    let isValid = false;
    this.state = { isValid };
  }

  validateAllInputs = () => {
    const allPromises = [
      this.purposeRef.current.validate(),
      this.propertyTypeRef.current.validate(),
      this.loanTypeRef.current.validate(),
      this.creditScoreRef.current.validate(),
      this.jobRef.current.validate(),
      this.incomeRef.current.validate(),
      this.challengeRef.current.validate(),
    ];

    return new Promise<{ accountFormValid: boolean, accountData: Object }>((resolve) => {
      Promise.all(allPromises).then((values: [boolean]) => {
        let reducedValid: boolean = this.inputValueReduce(values);

        this.setState({ isValid: reducedValid }, () => {
          const { isValid } = this.state;
          // const { submit } = this.props;
          // submit(isValid);
          resolve({
            accountFormValid: isValid, accountData: {
              purpose: this.purposeRef.current.value(),
              property: this.propertyTypeRef.current.value(),
              loan: this.loanTypeRef.current.value(),
              credit: this.creditScoreRef.current.value(),
              job: this.jobRef.current.value(),
              income: this.incomeRef.current.value(),
              challenge: this.challengeRef.current.value(),
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

type AccountDetailsFormProps = {
  account: any
};
type AccountDetailsFormState = {
  isValid: boolean
};

export default AccountDetailsForm;
