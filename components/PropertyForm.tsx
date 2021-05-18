import React from 'react';
import styles from './property-form.module.css';

import { PropertyInputs, VideosInput, ImagesInput } from "./PropertyForms";

const PropertyForm = ({ profile }) => {

    console.log("PROPERTY FORM", profile)

    return <div className={styles.propertyForm}>
        <PropertyInputs property={profile} />
        <ImagesInput property={profile} />
        <VideosInput />
    </div>
}
export default PropertyForm;