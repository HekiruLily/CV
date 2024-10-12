import React from "react";
import { useParams } from "react-router-dom";
import CaPheDen from "../assets/img/capheden.jpg"; // Hình ảnh sản phẩm
import CaCao from "../assets/img/cacao.jpg"; // Hình ảnh sản phẩm


const products = [
  // Danh sách sản phẩm như trong MenuPage
  {
    id: 13,
    title: "Cà phê đen",
    priceRange: "15.000 VND",
    image: "capheden.jpg",
    category: "ĐỒ UỐNG",
  },
  {
    id: 20,
    title: "Ca cao",
    priceRange: "15.000 VND",
    image: "cacao.jpg",
    category: "ĐỒ UỐNG",
  },
];

function ProductsPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }
  return (
    <div className="container mx-auto px-8 py-12 flex flex-col md:flex-row items-start bg-gray-100">
      {/* Phần hình ảnh sản phẩm */}
      <div className="w-full md:w-1/2 p-4">
        <img
          src={process.env.PUBLIC_URL + `/img/${product.image}`}
          alt={product.title}
          className="rounded-lg shadow-lg w-full transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      {/* Phần thông tin sản phẩm */}
      <div className="w-full md:w-1/2 p-4 ml-10">
        <h1 className="text-4xl font-semibold italic text-yellow-800 uppercase">
          {product.title}
        </h1>
        <div className="flex items-center mt-4">
          {/* Đánh giá bằng sao */}
          <span className="text-yellow-500 mr-2">★★★★★</span>
          <span className="text-sm text-gray-600">(12 lượt đánh giá)</span>
        </div>

        {/* Giá sản phẩm */}
        <div className="text-2xl font-thin text-black mt-4">
          {product.priceRange}
        </div>

        {/* Thêm số lượng và nút thêm vào giỏ hàng */}
        <div className="flex items-center mt-4">
          <label htmlFor="quantity" className="mr-4">
            Số lượng
          </label>
          <input
            type="number"
            id="quantity"
            className="w-16 p-2 border rounded-lg"
            min="1"
          />
        </div>

        {/* Các nút hành động */}
        <div className="flex mt-6 space-x-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg">
            Thêm vào giỏ hàng
          </button>
          <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-black">
            Mua hàng
          </button>
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-blue-700">
            CHI TIẾT SẢN PHẨM
          </h2>
          <p className="text-gray-700 mt-2 ">
            {product.title} là một sản phẩm chất lượng...
          </p>
        </div>
      </div>

      {/* Sản phẩm tương tự */}
      <div className="w-full mt-12">
        <h3 className="text-xl font-semibold text-center mb-4 text-blue-700">
          MỘT SỐ SẢN PHẨM TƯƠNG TỰ CỦA CHÚNG TÔI
        </h3>
        <div className="flex justify-center space-x-4">
          <div className="w-32 text-center">
            <img
              src={CaPheDen}
              alt="Ca Phe Den"
              className="size-32 rounded-lg shadow-lg w-full cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
            />
            <p className="mt-2 font-semibold italic uppercase">cà phê đen</p>
            <p>15.000 VND</p>
          </div>
          <div className="w-32 text-center">
            <img
              src={CaCao}
              alt="Ca Cao"
              className="size-32 rounded-lg shadow-lg w-full cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
            />
            <p className="mt-2 font-semibold italic uppercase">CA CAO</p>
            <p>20.000 VND</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
