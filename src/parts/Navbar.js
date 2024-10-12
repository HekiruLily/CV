import React, { useEffect, useState , useContext} from "react";
import { Link, useLocation } from "react-router-dom"; // Sử dụng useLocation để theo dõi vị trí
import { AiOutlineSearch } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
// them fixed khi luowt xuong va sua css
const Navbar = () => {
  const {
    menuItems,
  } = useContext(CartContext);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation(); // Lấy thông tin vị trí hiện tại

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Lấy vị trí cuộn hiện tại
      const viewportHeight = window.innerHeight * 0.1; // 10% chiều cao viewport

      if (scrollPosition > viewportHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false); // Đặt navbar về vị trí bình thường
      }
    };

    window.addEventListener("scroll", handleScroll); // Thêm sự kiện cuộn

    return () => window.removeEventListener("scroll", handleScroll); // Dọn dẹp sự kiện cuộn
  }, [location]); // Chạy lại khi vị trí thay đổi

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="container_Nav">
        <div className="navbar-menu">
          <ul>
            <li>
              <Link to="/">
                <h3>TRANG CHỦ</h3>
              </Link>
            </li>
            <li>
              <Link to="/menu">
                <h3>THỰC ĐƠN</h3>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <h3>LIÊN HỆ</h3>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-icons">
          <div className="search-bar">
            <AiOutlineSearch className="search-icon" />
            <input type="text" placeholder="Tìm kiếm" />
          </div>
          <Link to="/login">
            <h3>Đăng Nhập</h3>
          </Link>
          <div className="icon_nav">
            <Link to="/user">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png"
                alt="User Icon"
              />
            </Link>
            <div className="container_iconGH">
            <Link to="/shoppingCart">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/shopping-cart.png"
                alt="Cart Icon"
              />
            </Link> 
            <span className="count_carts">{menuItems.length}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
