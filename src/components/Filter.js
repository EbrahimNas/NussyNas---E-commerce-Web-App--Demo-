import React from 'react';
import styles from "../CSS/Filter.module.css";

function Filter({ onCategoryChange, onPriceChange, onNameChange, selectedCategory }) {

  return (

    <div className={styles.filterContainer}>

      {/* Filter by Category */}
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Abaya">Abaya</option>
        <option value="Dresses">Dresses</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* Filter by Price */}
      <select onChange={(e) => onPriceChange(e.target.value)}>
        <option value="default">Sort by Price</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>

      {/* Filter by Name */}
      <select onChange={(e) => onNameChange(e.target.value)}>
        <option value="default">Sort by Name</option>
        <option value="AtoZ">A to Z</option>
        <option value="ZtoA">Z to A</option>
      </select>

    </div>
  );
}

export default Filter;
