import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import FilterContainer from './FilterContainer';
import styles from "../CSS/Dresses.module.css";
import QuickNavigation from './QuickNavigation.js';

function Dresses() {

    
    return (

        <div className={styles.mainDresses}>
            <Header />

            <div className={styles.dresses}>
                <div className={styles.dressesContainer}>
                  <QuickNavigation />

                  <div className={styles.pageTitle}>
                      <h2> ≫ Dresses ≪ </h2>
                  </div>

                  <FilterContainer initialCategory="Dresses" />
                </div>

            </div>

            <Footer />
            
        </div>

    );
};

export default Dresses;