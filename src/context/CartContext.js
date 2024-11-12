import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart items from Firestore when the user logs in
    useEffect(() => {
        const fetchCartItems = async () => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setCartItems(userDoc.data().cartItems || []);
                }
            }
        };
        fetchCartItems();
    }, [currentUser]);

    // Save cart items to Firestore
    const saveCartItems = async (updatedItems) => {
        if (currentUser) {
            await setDoc(doc(db, "users", currentUser.uid), { cartItems: updatedItems }, { merge: true });
        }
    };

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id && item.size === product.size);
            const updatedItems = existingItem
                ? prevItems.map((item) =>
                    item.id === product.id && item.size === product.size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                  )
                : [...prevItems, { ...product, quantity: 1 }];
            saveCartItems(updatedItems);
            return updatedItems;
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => !(item.id === id && item.size === size));
            saveCartItems(updatedItems);
            return updatedItems;
        });
    };

    // Clear cart upon order submit
    const clearCart = async () => {
        if (currentUser) {
            // Clear cart in local state
            setCartItems([]);
    
            // Clear cart in Firestore
            await setDoc(doc(db, "users", currentUser.uid), { cartItems: [] }, { merge: true });
        }
    };

    const increaseQuantity = (id, size) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
            );
            saveCartItems(updatedItems);
            return updatedItems;
        });
    };

    const decreaseQuantity = (id, size) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems
                .map((item) => (item.id === id && item.size === size ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0);
            saveCartItems(updatedItems);
            return updatedItems;
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);