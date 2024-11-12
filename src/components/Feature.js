import React from 'react';
import { Link } from "react-router-dom";
import styles from "../CSS/Feature.module.css";

function Feature() {
    
    return (
        <div className={styles.feature}>
            <div className={styles.featureContent}>
                <Link to="/Abayas"><h3> ≫ Abayas ≪ </h3></Link>
                <Link to="/Dresses"><h3> ≫ Dresses ≪ </h3></Link>
                <Link to="/Accessories"><h3> ≫ Accessories ≪ </h3></Link>
            </div>
        </div>
    );
};

export default Feature;