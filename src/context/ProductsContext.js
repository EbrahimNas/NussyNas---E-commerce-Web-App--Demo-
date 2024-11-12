import React, { createContext, useContext } from 'react';
import useFireBProducts from '../services/fireBProducts.js';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const { products, loading, error } = useFireBProducts();

    return (
        <ProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);