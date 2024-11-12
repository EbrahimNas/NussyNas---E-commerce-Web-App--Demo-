import React, { useState, useEffect  } from 'react';
import useFireBProducts from "../services/fireBProducts.js";
import Filter from './Filter';
import ProductList from './ProductList';

function FilterContainer({ searchQuery = '',  initialCategory}) {

    const [category, setCategory] = useState(initialCategory || '');
    const [price, setPrice] = useState('');
    const [nameOrder, setNameOrder] = useState('');
    const { products, loading, error } = useFireBProducts();

    useEffect(() => {
        // Set category on mount if provided
        setCategory(initialCategory || '');
    }, [initialCategory]);
    
    const handleCategoryChange = (selectedCategory) => setCategory(selectedCategory);
    const handlePriceChange = (selectedPriceOrder) => setPrice(selectedPriceOrder);
    const handleNameChange = (selectedNameOrder) => setNameOrder(selectedNameOrder);

    // Filter and sort the products
    const filteredProducts = products
      .filter(product => 
         (category === '' || product.category === category) &&
         (product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery))
      )
      .sort((a, b) => {
         if (price === 'lowToHigh') return a.price - b.price;
         if (price === 'highToLow') return b.price - a.price;
         if (nameOrder === 'AtoZ') return a.name.localeCompare(b.name);
         if (nameOrder === 'ZtoA') return b.name.localeCompare(a.name);
         return 0;
    });


    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error.message}</p>;

    
    return (
        <>
            <Filter
                onCategoryChange={handleCategoryChange}
                onPriceChange={handlePriceChange}
                onNameChange={handleNameChange}
                selectedCategory={category}
                price={price}
                nameOrder={nameOrder}
            />

            {filteredProducts.length > 0 ? (
               <ProductList products={filteredProducts} />
            ) : (
                <h1>uh oh products not currently available 😞</h1>
            )}
        </>
    );
}

export default FilterContainer;


