import React, { useState } from "react";
import ProductList from "../components/Menu/ProductList";
import CategoryButton from "../components/Menu/CategoryButton/CategoryButton";
import { ProductsMenu } from "./ProductsMenu";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("ĐỒ ĂN");
 <ProductsMenu/>
  const filteredProducts = ProductsMenu.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div style={{ height: "100%", backgroundColor: "" }}>
      {/* Thêm className để style dễ hơn */}
      <div className="category-container">
        <CategoryButton
          label="ĐỒ ĂN"
          active={activeCategory === "ĐỒ ĂN"}
          onClick={() => setActiveCategory("ĐỒ ĂN")}
        />
        <CategoryButton
          label="ĐỒ UỐNG"
          active={activeCategory === "ĐỒ UỐNG"}
          onClick={() => setActiveCategory("ĐỒ UỐNG")}
        />
        <CategoryButton
          label="KHÁC"
          active={activeCategory === "KHÁC"}
          onClick={() => setActiveCategory("KHÁC")}
        />
      </div>

      {/* Hiển thị sản phẩm */}
      <ProductList ProductsMenu={filteredProducts} />
    </div>
  );
};
export default MenuPage;
