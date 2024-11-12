import React from "react";
import Product from "./Product.js";
import styles from "../CSS/ProductList.module.css";

function ProductList({ products = [] }) {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
