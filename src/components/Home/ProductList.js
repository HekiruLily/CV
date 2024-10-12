import React from "react";
import ProductCard from "./ProductCard/ProductCard";
import { ProductHome } from "../../pages/ProductsHome";

function ProductList() {
  return (
    <div className="product-list">
      {ProductHome.map((product) => (
        <ProductCard data={product} 
        />
      ))}
    </div>
  );
}

export default ProductList;
