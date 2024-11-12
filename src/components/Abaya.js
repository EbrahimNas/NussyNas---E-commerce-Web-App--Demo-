import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import FilterContainer from './FilterContainer';
import QuickNavigation from './QuickNavigation.js';
import styles from "../CSS/Abaya.module.css";

function Abaya() {

    
    return (

        <div className={styles.mainAbaya}>
            <Header />

            <div className={styles.abaya}>
                <div className={styles.abayaContainer}>
                  <QuickNavigation />

                  <div className={styles.pageTitle}>
                      <h2> ≫ Abayas ≪ </h2>
                  </div>

                  <FilterContainer initialCategory="Abaya" />
                </div>

            </div>

            <Footer />
            
        </div>

    );
};

export default Abaya;