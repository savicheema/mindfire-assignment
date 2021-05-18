import React from 'react';
import styles from './property-inputs.module.css';

import formStyles from "../form-style.module.css"

import FormInput, { FormInputHOC } from "../utils/FormInput";

class PropertyInputs extends React.Component<PropertyInputsProps, PropertyInputsState> {
    render() {
        const { property } = this.props;

        return (
            <div className={styles.propertyInputs}>
                <h2>Property Details</h2>
                <div className={formStyles.formDiv}>
                    <FormInput
                        name="full name"
                        ref={this.propertyNameRef}
                        regex={/^[a-zA-Z]([-']?[a-z]+)*( [a-zA-Z]([-']?[a-z]+)*)+$/}
                        placeholder="John Doe"
                    // value={property.name}
                    />
                    <FormInput
                        name="address"
                        ref={this.addressRef}
                        placeholder="433 Airport Blvd, Ste 106, Burl.."
                        regex={/.*/}
                    // value={property.address}
                    />
                </div>


            </div>
        );
    }
    private propertyNameRef = React.createRef<FormInputHOC>();
    private addressRef = React.createRef<FormInputHOC>();

    constructor(props: PropertyInputsProps) {
        super(props)
    }
}

type PropertyInputsProps = {
    property: property
};
type PropertyInputsState = {};

type property = {
    name: string,
    address: string
};

export default PropertyInputs;