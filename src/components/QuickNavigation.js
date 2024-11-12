import React from 'react';
import { Link } from "react-router-dom";
import styles from "../CSS/QuickNavigation.module.css";

function QuickNavigation() {

    return (
        <div >
            <div className={styles.navigation}>
                <div className={styles.navigationContainer}>
                  <Link to='/'>Home</Link>
                  <Link to='/abayas'>Abayas</Link>
                  <Link to='/dresses'>Dresses</Link>
                  <Link to='/accessories'>Accessories</Link>
                </div>
            </div>
        </div>
    )
}

export default QuickNavigation;