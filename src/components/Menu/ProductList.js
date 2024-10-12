import React from "react";
import ProductCard from "./ProductCard/ProductCard";
import { ProductsMenu } from "../../pages/ProductsMenu";

function ProductList() {
  return (
    <div className="product-list">
      {ProductsMenu.map((product) => (
        <ProductCard data={product} 
        />
      ))}
    </div>
  );
}

export default ProductList;
