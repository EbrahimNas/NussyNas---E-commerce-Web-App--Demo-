import React from 'react';
import { useCart } from '../context/CartContext';
import Header from './Header.js';
import Footer from './Footer.js';
import QuickNavigation from './QuickNavigation.js';
import styles from '../CSS/Bag.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Bag() {
    const navigate = useNavigate();
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    // Calculate total number of items and total amount
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        // Check if all items have a size selected
        const allSizesSelected = cartItems.every(item => item.size);
        if (!allSizesSelected) {
            alert('Please select a size for all items before proceeding to checkout.');
            return;
        }

        //alert('Proceeding to checkout!');
        navigate('/orderSummary');
    };

    return (
        <div className={styles.mainBag}>
            <Header />

            <div className={styles.bag}>
                <div className={styles.bagContainer}>
                    <QuickNavigation />
                    
                    <div className={styles.pageTitle}>
                        <h2> ≫ My Bag ≪ </h2>
                    </div>

                    <div className={styles.summary}>
                        <p>{totalItems} Items: Total (excluding delivery) NGN {totalAmount.toLocaleString()}</p>
                    </div>

                    {cartItems.length === 0 ? (
                        <p>Your bag is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className={styles.cartItem}>

                                <Link to={`/product/${item.name}/${item.id}`}>
                                    <img src={item.imageUrl} alt={item.name} className={styles.cartImage} />
                                </Link>

                                <div className={styles.cartDetails}>
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                    <h3>NGN {item.price.toLocaleString()}</h3>

                                    {item.size ? (
                                        <p>Size: {item.size}</p>
                                    ) : (
                                        <div className={styles.sizeSelector}>
                                            <label htmlFor={`size-${item.id}`}>
                                                Select Size:
                                                <select id={`size-${item.id}`}
                                                    onChange={(e) => {
                                                        item.size = e.target.value; 
                                                    }}
                                                   >
                                                    <option value="">--Select Size--</option>
                                                    <option value="XS">Extra Small</option>
                                                    <option value="S">Small</option>
                                                    <option value="M">Medium</option>
                                                    <option value="L">Large</option>
                                                    <option value="XL">Extra Large</option>
                                                    <option value="XXL">Double X Large</option>
                                                </select>
                                            </label>
                                        </div>
                                    )}

                                    <div className={styles.quantityControls}>
                                        <button onClick={() => decreaseQuantity(item.id, item.size)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.id, item.size)}>+</button>
                                    </div>
                                </div>

                                <button onClick={() => removeFromCart(item.id, item.size)} className={styles.removeButton}>
                                    X
                                </button>
                            </div>
                        ))
                    )}

                    {cartItems.length > 0 && (
                        <button onClick={handleCheckout} className={styles.checkoutButton}>
                            Checkout
                        </button>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Bag;
