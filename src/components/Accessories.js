import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import FilterContainer from './FilterContainer';
import QuickNavigation from './QuickNavigation.js';
import styles from "../CSS/Accessories.module.css";

function Accessories() {

    
    return (

        <div className={styles.mainAccessories}>
            <Header />

            <div className={styles.accessories}>
                <div className={styles.accessoriesContainer}>
                  <QuickNavigation />

                  <div className={styles.pageTitle}>
                      <h2> ≫ Accessories ≪ </h2>
                  </div>

                  <FilterContainer initialCategory="Accessories" />
                </div>

            </div>

            <Footer />
            
        </div>

    );
};

export default Accessories;