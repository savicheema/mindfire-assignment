import React from 'react';
import Image from "next/image";

import styles from './poster.module.css';

const Poster = () => <div className={styles.poster}>
    <div className={styles.bgImg}></div>
    <Image src="/logo-white.png" width={220} height={54} />

    <p className={styles.mortgageShoppingEx}>
        Mortgage Shopping Experinece Customized For You
    </p>
    <div className={styles.rectangleSlim}></div>
</div>;
export default Poster;