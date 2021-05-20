import React from 'react';
import styles from './property-inputs.module.css';

import formStyles from "../form-style.module.css"
import homeStyles from "../../styles/Home.module.css";

import FormInput, { FormInputHOC } from "../utils/FormInput";

import Button from "@material-ui/core/Button";

import { updateData } from "../../utils/firebase";


class PropertyInputs extends React.Component<PropertyInputsProps, PropertyInputsState> {
    render() {
        const { profile } = this.props;

        if (!profile) return "";
        return (
            <div className={styles.propertyInputs}>
                <div className={styles.propertyHeader}>
                    <h2>Property Details</h2>
                    <Button color="secondary" onClick={() => { window.location.href = '/user/profile'; }}>Go Back</Button>
                </div>
                <div className={formStyles.formDiv}>
                    <FormInput
                        name="property name"
                        ref={this.propertyNameRef}
                        regex={/^[a-zA-Z]([-']?[a-z]+)*( [a-zA-Z]([-']?[a-z]+)*)+$/}
                        placeholder="Home"
                        value={profile.userProperty && `${profile.userProperty.name}`}
                    />
                    <FormInput
                        name="address"
                        ref={this.addressRef}
                        placeholder="433 Airport Blvd, Ste 106, Burl.."
                        regex={/.*/}
                        value={profile.userProperty && `${profile.userProperty.address}`}
                    />
                    <Button color="primary" size="small" variant="contained" onClick={this.savePropertyDetails} className={homeStyles.primaryButton}>Save</Button>
                </div>
            </div>
        );
    }
    private propertyNameRef = React.createRef<FormInputHOC>();
    private addressRef = React.createRef<FormInputHOC>();

    constructor(props: PropertyInputsProps) {
        super(props)
    }

    savePropertyDetails = async () => {
        const { profile } = this.props;

        if (!profile) return;

        const isNameValid = await this.propertyNameRef.current.validate();
        const isAddressValid = await this.addressRef.current.validate();

        if (isNameValid && isAddressValid) {
            const property = {
                name: "",
                address: ""
            }
            property.name = this.propertyNameRef.current.value();
            property.address = this.addressRef.current.value();
            profile.userProperty = property;

            updateData(profile.email, profile);
        }
    }
}

type PropertyInputsProps = {
    profile: any
};

type PropertyInputsState = {};

export default PropertyInputs;