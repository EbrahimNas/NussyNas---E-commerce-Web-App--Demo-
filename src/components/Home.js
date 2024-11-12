import React from 'react';
import Header from './Header.js';
import Banner from './Banner.js';
import Footer from './Footer.js';
import Feature from './Feature.js';
import styles from "../CSS/Home.module.css";

function Home() {

    return (
        <div className={styles.home}>
            <Header />
            <Banner />
            <Feature />
            <Footer />
        </div>
    );

};

export default Home;