import React, { useState } from "react";
import ProductList from "../components/Home/ProductList";
import CategoryButton from "../components/Home/CategoryButton/CategoryButton"

import { ProductHome } from "./ProductsHome";
const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("Mới Nhất");

   <ProductHome/>

  const filteredProducts = ProductHome.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div>
      {/* Thêm className để style dễ hơn */}
      <div className="category-container">
        {["Mới Nhất", "Gần Đây", "Đã Lưu"].map((category) => (
          <CategoryButton
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {/* Hiển thị sản phẩm */}
      <ProductList ProductHome={filteredProducts} />

      <div
        className="More"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            cursor: "pointer",
            margin: "0 10px",
            backgroundColor: "#3498db",
            border: "2px solid #2980b9",
            color: "white",
            fontSize: "16px",
            borderRadius: "5px",
            padding: "10px 20px",
            transition: "background-color 0.3s ease",
          }}
        >
          Xem Thêm
        </button>
      </div>
    </div>
  );
};

export default HomePage;
