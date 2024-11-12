import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import QuickNavigation from './QuickNavigation.js';
import styles from "../CSS/Banner.module.css";

function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const bannerImages = [
        '/otherResources/images/lianaAbaya4.png',
        '/otherResources/images/lianaAbaya1.png',

    ]

    // Function to handle 'Next' button click
    const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    };

    // Function to handle 'Previous' button click
    const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
    };

    return (

        <div className={styles.banner}>
            <QuickNavigation />

            <div className={styles.bannerContent}>
              
              <div className={styles.catchPhrase}>
                <h2>NussyNas: 'Where Modesty Meets Chic Elegance'</h2>
              </div>

              <div className={styles.bannerImage}>
                  <img src='/otherResources/icons/lesser.png' alt='previous button' onClick={handlePrevious} className={styles.nextPrev}/>
                  <img src={bannerImages[currentIndex]} alt='featured product'/>
                  <img src='/otherResources/icons/greater.png' alt='next button' onClick={handleNext} className={styles.nextPrev}/>
              </div>
                
              <div className={styles.buyIt}>
                <h2>Fancy the Liana Abaya?</h2>
                <br></br>
                  
                <Link to='/product/Liana%20Abaya/G5vYyBYirp12PibaRXhs'>
                  <button>Buy it now!</button>
                </Link>
                  
                </div>
            </div>

            <div className={styles.bannerFoot}>
              <div className={styles.bannerFootContent}>
                 <h3>FREE WORLDWIDE SHIPPING</h3>
                 <p>*minimum spend applies*</p>
              </div>
            </div>
        </div>

    );
};

export default Banner;