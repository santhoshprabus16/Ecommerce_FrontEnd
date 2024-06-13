import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import ProductPage from './productpage/ProductPage';
import WishlistPage from './WishlistPage';
import LoginPage from './LoginPage';
import CartPage from './CartPage'; 
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './privateroute/privateroute';
import RegisterPage from './RegisterPage';

const App = ({ location }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const updateWishlist = (newWishlist) => {
    setWishlistItems(newWishlist);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const updateDataInWishList = (data) => {
    setWishlistItems(prevState => ({ ...prevState, prevState }));
  };

  const updateDataInCartList = (data) => {
    var storeLocale = JSON.parse(localStorage.getItem("productWishlist"));
    setCart(storeLocale.filter(item => item.addCart === true));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <Navbar toggleDarkMode={toggleDarkMode} WishcartCount={cart} wishItemCount={wishlistItems} />
              <Home updateDataInWishList={updateDataInWishList} />
            </div>
          </PrivateRoute>
        } />
        
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/wishlist" element={
          <PrivateRoute>
            <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <Navbar toggleDarkMode={toggleDarkMode} WishcartCount={cart} wishItemCount={wishlistItems} />
              <WishlistPage updateDataInCartList={updateDataInCartList} />
            </div>
          </PrivateRoute>
        } />

        <Route path="/cart" element={
          <PrivateRoute>
            <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <Navbar toggleDarkMode={toggleDarkMode} WishcartCount={cart} wishItemCount={wishlistItems} />
              <CartPage cartItems={cart} updateDataInCartList={updateDataInCartList} />
            </div>
          </PrivateRoute>
        } />

        <Route path="/products" element={
          <PrivateRoute>
            <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <Navbar toggleDarkMode={toggleDarkMode} WishcartCount={cart} wishItemCount={wishlistItems} />
              <ProductPage updateDataInWishList={updateDataInWishList} />
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
