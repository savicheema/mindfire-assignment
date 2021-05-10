import React from "react";
import styles from "./profile-form.module.css";
import { Button } from "@material-ui/core";

import { updateData } from "../utils/firebase";

import {
  ProfilePic,
  PersonalDetailsForm,
  AccountDetailsForm,
} from "./ProfileForms";

class ProfileForm extends React.Component<ProfileFormProps, ProfileFormState> {
  render() {
    const { profile } = this.props;

    return (
      <form className={styles.profileForm}>
        <ProfilePic />
        <PersonalDetailsForm personal={profile} ref={this.personalDetailFormRef} />
        <AccountDetailsForm ref={this.accountDetailFormRef} account={profile} />

        <div className={styles.profileFormButtons}>

          <Button
            variant="contained"
            color="primary"
            className={styles.buttonFont}
            onClick={this.submit}
          >
            Save
                  </Button>

          <Button
            variant="contained"
            color="secondary"
            className={styles.buttonFont}
          >
            Cancel
                  </Button>
        </div>
      </form>
    );
  }
  private personalDetailFormRef = React.createRef<PersonalDetailsForm>();
  private accountDetailFormRef = React.createRef<AccountDetailsForm>();
  constructor(props: ProfileFormProps) {
    super(props)
  }

  submit = async () => {
    const { personalFormValid, personalData } = await this.personalDetailFormRef.current.validateAllInputs();
    // const { accountFormValid, accountData } = await this.accountDetailFormRef.current.validateAllInputs();

    const { profile } = this.props;
    if (personalFormValid) updateData(profile.email, { ...profile, ...personalData })
  }
}

type ProfileFormProps = {
  profile: any
};
type ProfileFormState = {};

export default ProfileForm;
