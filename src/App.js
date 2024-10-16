import React from "react";
import Header from "./parts/Header";
import Navbar from "./parts/Navbar";
import Footer from "./parts/Footer";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import UserPage from "./pages/UserPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/login/login/Login";
import LoginPhoneNumber from "./pages/login/loginphonenumber/LoginPhoneNumber";
import LoginMail from "./pages/login/loginmail/LoginMail";
import SignIn from "./pages/login/login/Login";
import ReviewOrder from "./pages/ReviewOrder";
import Forgotpassword from "./pages/login/forgotpassword/Fogotpassword";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import Payment from "./pages/Payment/Payment";
import TransferQRCode from "./pages/Payment/TransferQRCode";

function App() {
  return (
    <div className="App">
      <CartProvider>
      <Header />
      <Navbar />
      <div className="bodyWeb">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/shoppingCart" element={<ShoppingCartPage />} />
          <Route path="/product/:productId" element={<ProductsPage />} />
          <Route path="login" element={<Login />} />
          <Route path="/revieworder" element={<ReviewOrder />} />
          <Route path="loginphonenumber" element={<LoginPhoneNumber />} />
          <Route path="loginemail" element={<LoginMail />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/transferQRcode" element={<TransferQRCode />} />
        </Routes>

      
      </div>
      <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
