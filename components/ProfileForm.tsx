import React from "react";
import styles from "./profile-form.module.css";
import homeStyles from "../styles/Home.module.css";

import { Button } from "@material-ui/core";

import { updateData } from "../utils/firebase";

import SweetAlert from 'react-bootstrap-sweetalert';


import {
  ProfilePic,
  PersonalDetailsForm,
  AccountDetailsForm,
} from "./ProfileForms";

class ProfileForm extends React.Component<ProfileFormProps, ProfileFormState> {
  render() {
    const { profile } = this.props;

    const { isSuccess } = this.state;

    return (
      <form className={styles.profileForm}>
        <ProfilePic profile={profile} />
        <PersonalDetailsForm personal={profile} ref={this.personalDetailFormRef} />
        <AccountDetailsForm ref={this.accountDetailFormRef} account={profile} />

        <div className={styles.profileFormButtons}>

          <Button
            variant="contained"
            color="primary"
            className={homeStyles.primaryButton}
            onClick={this.submit}
          >
            Next
          </Button>

          <Button
            color="secondary"
            className={homeStyles.secondaryButton}
          >
            Cancel
          </Button>
        </div>

        {/* isSuccess && <SweetAlert success title="Success!" onConfirm={this.onConfirm} onCancel={this.onCancel}>
          Your personal and account details have been updated.
    </SweetAlert> */}
      </form>
    );
  }
  private personalDetailFormRef = React.createRef<PersonalDetailsForm>();
  private accountDetailFormRef = React.createRef<AccountDetailsForm>();
  constructor(props: ProfileFormProps) {
    super(props)

    let isSuccess = false;
    this.state = { isSuccess };
  }

  submit = async () => {
    const { personalFormValid, personalData } = await this.personalDetailFormRef.current.validateAllInputs();
    const { accountFormValid, accountData } = await this.accountDetailFormRef.current.validateAllInputs();

    const { profile } = this.props;
    if (personalFormValid && accountFormValid) {
      this.setState({ isSuccess: true }, () => {
        updateData(profile.email, { ...profile, ...personalData, ...accountData }).then(() => {
          window.location.href = '/user/property';
        });
      })
    }
  }

  onConfirm = () => {
    this.setState({ isSuccess: false });
  }

  onCancel = () => {
    this.setState({ isSuccess: false });
  }
}

type ProfileFormProps = {
  profile: any
};
type ProfileFormState = {
  isSuccess: boolean
};

export default ProfileForm;
