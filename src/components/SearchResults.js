import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import FilterContainer from './FilterContainer';
import styles from '../CSS/SearchResults.module.css';

function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('query')?.toLowerCase() || '';



    return (

        <div className={styles.mainSearch}>
            <Header />

            <div className={styles.search}>
                <div className={styles.searchContainer}>

                  <div className={styles.pageTitle}>
                      <h2>Search Results for: "{searchQuery}"</h2>
                  </div>

                
                 <FilterContainer searchQuery={searchQuery} />
                </div>

            </div>
            
            <Footer />
        </div>
        
    );
}

export default SearchResults;


