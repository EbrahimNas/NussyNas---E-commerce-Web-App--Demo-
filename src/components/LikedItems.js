import React from 'react';
import { useLikedItems } from '../context/LikedItemsContext';
import Header from './Header.js';
import Footer from './Footer.js';
import Product from './Product';
import QuickNavigation from './QuickNavigation.js';
import styles from '../CSS/LikedItems.module.css';

function LikedItems() {
  const { likedItems } = useLikedItems();

  return (
    <div className={styles.mainLikedItems}>
        <Header />

        <div className={styles.likedItems}>
            <div className={styles.likedItemsContainer}>
                <QuickNavigation />

                <div className={styles.pageTitle}>
                   <h2> ≫ Liked Items ≪ </h2>
                </div>

                {likedItems.length > 0 ? (
                  <div className={styles.productGrid}>
                      {likedItems.map(item => (
                          <Product key={item.id} product={item} />
                      ))}
                  </div>

                 ) : (

                    <p>No items liked yet.</p>
                )}
            </div>

        </div>

        <Footer />
    </div>
  );
}

export default LikedItems;
