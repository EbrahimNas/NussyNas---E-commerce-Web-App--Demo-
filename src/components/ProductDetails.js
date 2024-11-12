import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { useLikedItems } from '../context/LikedItemsContext';
import Header from './Header.js';
import Footer from './Footer.js';
import QuickNavigation from './QuickNavigation.js';
import styles from '../CSS/ProductDetails.module.css';

function ProductDetails() {
    const { id } = useParams();  // Fetch the product ID from the URL
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { likedItems, addLikedItem, removeLikedItem } = useLikedItems(); // Use the liked items context
    const [product, setProduct] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    // Fetch the product details from your product list
    useEffect(() => {
        const selectedProduct = products.find((item) => item.id === id);
        setProduct(selectedProduct);
        // Check if the product is liked
        if (selectedProduct) {
            setIsLiked(likedItems.some((item) => item.id === selectedProduct.id));
        }
    }, [id, products, likedItems]);

    // Handle like toggle
    const handleToggleLike = () => {
        if (isLiked) {
            removeLikedItem(product.id);
        } else {
            addLikedItem(product);
        }
        setIsLiked(!isLiked);
    };

    // Handle Cart Addition
    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart({ ...product, size: selectedSize });
            console.log("Added to cart:", { ...product, size: selectedSize });
        } else {
            alert('Please select a size before adding to cart.');
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.mainProductDetails}>
            <Header />

            <div className={styles.productDetails}>
                <QuickNavigation />
                
                <div className={styles.productDetailsContainer}>

                    <div className={styles.productImgcontainer}>
                      <img src={product.imageUrl} alt={product.name} className={styles.productImg} />
                    </div>

                    <div className={styles.productInfo}>
                        <h1>{product.name}</h1>
                        <h3>NGN {product.price.toLocaleString()}</h3>
                        <p>{product.description}</p>

                        <div className={styles.sizeSelector}>
                            <label htmlFor="size">
                                Select Size:
                                <select id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="XS">Extra Small</option>
                                    <option value="S">Small</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Large</option>
                                    <option value="XL">Extra Large</option>
                                    <option value="XXL">Double X Large</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.productButtons}>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                            <div onClick={handleToggleLike} style={{ cursor: "pointer" }} className={styles.likeButton}>
                                {isLiked ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="rgb(235, 42, 106)"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.sizeGuideContainer}>
                    <button onClick={() => setShowSizeGuide(!showSizeGuide)} className={styles.sizeGuideButton}>
                        {showSizeGuide ? "Hide Size Guide" : "Show Size Guide"}
                    </button>

                    {showSizeGuide && (
                        <div className={styles.sizeGuideImage}>
                            <img src="/otherResources/images/size-guide.png" alt="Size Guide" />
                        </div>
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default ProductDetails;
