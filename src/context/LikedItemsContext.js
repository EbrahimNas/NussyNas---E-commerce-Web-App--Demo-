import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext.js';

const LikedItemsContext = createContext();

export function LikedItemsProvider({ children }) {
    const { currentUser } = useContext(AuthContext);
    const [likedItems, setLikedItems] = useState([]);

    // Fetch liked items from Firestore on login
    useEffect(() => {
        const fetchLikedItems = async () => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setLikedItems(userDoc.data().likedItems || []);
                }
            }
        };
        fetchLikedItems();
    }, [currentUser]);

    // Save liked items to Firestore
    const saveLikedItems = async (updatedItems) => {
        if (currentUser) {
            await setDoc(doc(db, "users", currentUser.uid), { likedItems: updatedItems }, { merge: true });
        }
    };

    const addLikedItem = (item) => {
        const updatedItems = [...likedItems, item];
        setLikedItems(updatedItems);
        saveLikedItems(updatedItems); // Save to Firestore
    };

    const removeLikedItem = (id) => {
        const updatedItems = likedItems.filter((item) => item.id !== id);
        setLikedItems(updatedItems);
        saveLikedItems(updatedItems); // Save to Firestore
    };

    return (
        <LikedItemsContext.Provider value={{ likedItems, addLikedItem, removeLikedItem }}>
            {children}
        </LikedItemsContext.Provider>
    );
}

export const useLikedItems = () => useContext(LikedItemsContext);