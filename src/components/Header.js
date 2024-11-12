import React, { useContext, useState  } from 'react';
import { AuthContext } from "../context/AuthContext.js";
import { logoutUser } from "../services/auth.js";
import { useNavigate } from 'react-router-dom';
import styles from "../CSS/Header.module.css";
import { Link } from "react-router-dom";

function Header() {
    const { currentUser } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();


    // Function to handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    
    // Function to toggle User Function visibility
    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState); // Toggle the state
    };

    //Function to Handle Logout
    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (

        <div>
            <div className={styles.header}>
                <div className={styles.headerContent}>

                    <div className={styles.headerNav}>
                        
                        <div className={styles.logo}>
                           <Link to="/"><img src='/otherResources/images/NussyXnas-brand-logoBX.png' alt='NussyNas-logo'/></Link>
                        </div>

                        <div className={styles.hlinks}>

                           <ul className={styles.links}> 
                                <form className={styles.search} onSubmit={handleSearch} >
                                    <input
                                       type="text" 
                                       placeholder="Search for an item" 
                                       value={searchQuery} 
                                       onChange={(e) => setSearchQuery(e.target.value)} 
                                    />
                                    <button type="submit"><img src='/otherResources/icons/search.png' alt='search-logo'/></button>
                                </form>
                                <li className={styles.user}>
                                    <svg className={styles.svgIcon} onClick={toggleVisibility}
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="24" 
                                        height="24" 
                                        fill="black" 
                                        stroke="black" 
                                        viewBox="0 0 50 50" 
                                        strokeWidth="1" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        >

                                        <g transform="translate(0,50) scale(0.1,-0.1)" >
                                            <path stroke="black"  fill="black" d="M203 450 c-36 -15 -55 -56 -64 -138 -5 -42 -10 -86 -11 -97 -2 -14 6 -22 30 -30 38 -13 34 -19 -35 -54 -42 -21 -63 -46 -63 -75 0 -14 24 -16 190 -16 166 0 190 2 190 16 0 29 -21 54 -63 75 -69 35 -73 41 -35 53 l33 11 -4 85 c-3 93 -20 147 -48 156 -10 3 -26 10 -35 15 -22 11 -56 11 -85 -1z m91 -25 c45 -19 54 -41 57 -141 l2 -79 -29 -5 c-48 -9 -38 -40 23 -73 29 -16 58 -37 63 -48 10 -18 6 -19 -160 -19 -166 0 -170 1 -160 19 5 11 34 32 63 48 61 33 72 66 24 71 l-28 3 6 67 c10 114 15 130 42 152 31 24 49 25 97 5z"/>
                                        </g>
                                    </svg>
                                    
                                </li>
                                
                                <li><Link to="/LikedItems">
                                       <svg className={styles.svgIcon}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="24"
                                         height="24"
                                         fill="none"
                                         stroke="black"
                                         viewBox=" 0 24 24"
                                         strokeWidth="1"
                                         strokeLinecap="round"
                                         strokeLinejoin="round"
                                         >
                                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                        </svg>
                                    </Link>
                                </li>

                                <li><Link to="/bag">
                                      <svg className={styles.svgIcon}
                                         width="24" 
                                         height="24" 
                                         viewBox="0 0 14 15" 
                                         fill="none" 
                                         xmlns="http://www.w3.org/2000/svg"
                                         >
                                          <path fill="black" fillRule="evenodd" clipRule="evenodd" d="M6.96786 0.625C6.15631 0.625 5.35897 0.924845 4.7656 1.54933C4.17834 2.16737 3.81877 3.07333 3.81021 4.24365H2.48465C2.13568 4.24365 1.84488 4.50175 1.77841 4.85449L0.424082 12.9158C0.324377 13.518 0.773049 14.0687 1.35466 14.0687H12.4635C13.0534 14.0687 13.502 13.518 13.394 12.9158L12.0314 4.85449C11.9737 4.50455 11.6789 4.24776 11.3335 4.2437L11.3252 4.24365H10.1255C10.1169 3.07333 9.75737 2.16737 9.17012 1.54933C8.57674 0.924845 7.77941 0.625 6.96786 0.625ZM9.37548 4.24365C9.36702 3.22935 9.05803 2.52019 8.62642 2.06594C8.18773 1.60426 7.59367 1.375 6.96786 1.375C6.34204 1.375 5.74798 1.60426 5.3093 2.06594C4.87768 2.52019 4.56869 3.22935 4.56024 4.24365H9.37548ZM1.35466 13.3187C1.26359 13.3187 1.13096 13.2143 1.15955 13.0396L2.51129 4.99365H11.2985L12.6589 13.0415L12.6602 13.0489C12.6892 13.2107 12.5689 13.3187 12.4635 13.3187H1.35466Z"></path>
                                          <path className={styles.filled} d="M13.0243 12.9783L13.0243 12.9783L13.0249 12.982C13.0939 13.3667 12.8074 13.6937 12.4635 13.6937H1.35466C1.02213 13.6937 0.729448 13.3686 0.793985 12.9774C0.794005 12.9773 0.794025 12.9772 0.794046 12.9771L2.14752 4.92083C2.18461 4.73126 2.33256 4.61865 2.48465 4.61865H11.3252C11.4847 4.61865 11.6321 4.73799 11.6614 4.9155L11.6616 4.91699L13.0243 12.9783Z" fill="none" stroke="black" strokeWidth="0.1" strokeMiterlimit="10"></path>
                                      </svg>
                                    </Link>
                                </li>
                           </ul>

                        </div>
                    </div>

                    <div className={styles.headerBrand}>
                      <h1 className={styles.brandName}>NussyNas</h1>
                    </div>
                </div>
            </div>

            <div className={styles.headerBottom} style={{ display: isVisible ? 'flex' : 'none' }}>
                <div className={styles.hBottomContent}>
                    <div className={styles.hBottomContents}>
                      {currentUser ? (
                            <>
                              <span>Hi, {currentUser.firstName}</span>
                              <span onClick={handleLogout} className={styles.logout}>Logout</span>
                            </>
                         ) : (
                                <>
                                    <Link to="/access?form=login">Sign In</Link>
                                    <Link to="/access?form=register">Join</Link>
                                </>
                            )}
                      <Link to="/userAccount">My Account</Link>
                      <Link to="/orderHistory">My orders</Link>
                    </div>
                    
                </div>
            </div>
        </div>

        
    );
};

export default Header;