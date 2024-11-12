import React, { useState, useEffect } from 'react';
import styles from '../CSS/Product.module.css';
import { useLikedItems } from '../context/LikedItemsContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Product({ product }) {
    const { likedItems, addLikedItem, removeLikedItem } = useLikedItems();
    const { cartItems, addToCart, removeFromCart } = useCart();

    const [isLiked, setIsLiked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        // Check if the product is already liked on component mount
        setIsLiked(likedItems.some((item) => item.id === product.id));

        // Check if the product is already in the cart on component mount
        setIsInCart(cartItems.some((item) => item.id === product.id));
    }, [likedItems, cartItems, product.id]);

    // Handle Like Toggle
    const handleToggleLike = () => {
        if (isLiked) {
            removeLikedItem(product.id);
        } else {
            addLikedItem(product);
        }
        setIsLiked(!isLiked);
    };

    // Handle cart Toggle
    const handleToggleCart = () => {
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
        setIsInCart(!isInCart);
    };

    return (
        <div className={styles.product}>
            <div className={styles.imgContainer}>

               <Link to={`/product/${product.name}/${product.id}`}>
                   <div className={styles.imgContainer}>
                      <img src={product.imageUrl} alt={product.name} />
                   </div>
               </Link>

                <div onClick={handleToggleCart} className={styles.cartIconContainer}>

                    {isInCart ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="rgb(235, 42, 106)"
                            viewBox="0 0 24 24"
                            stroke="none"
                            >
                            <path d="M6 6h15l-1.68 8.39a2 2 0 0 1-2 1.61H8a2 2 0 0 1-2-1.61L4 2H2" />
                            <circle cx="9" cy="20" r="1" />
                            <circle cx="18" cy="20" r="1" />
                        </svg>
                      ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="black"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 6h15l-1.68 8.39a2 2 0 0 1-2 1.61H8a2 2 0 0 1-2-1.61L4 2H2" />
                            <circle cx="9" cy="20" r="1" />
                            <circle cx="18" cy="20" r="1" />
                        </svg>
                    )}

                </div>
            </div>

            <h3>{product.name}</h3>
            <p>NGN {product.price.toLocaleString()}</p>

            <div onClick={handleToggleLike} style={{ cursor: "pointer" }}>
                {isLiked ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="rgb(235, 42, 106)"
                        viewBox="0 0 24 24"
                        >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="black"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                       >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                )}
            </div>
        </div>
    );
}

export default Product;