import React, { useState } from 'react';
import ProductPage from './productpage/ProductPage';
import Sidebar from '../src/sidebar/sidebar';
import Navbar from './Navbar';


const Home = ({ updateDataInWishList }) => {
  const [priceFilter, setPriceFilter] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cart, setCart] = useState([]);

  const handlePriceFilter = (filter) => {
    setPriceFilter(filter);
  };
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const updateWishlist = (newWishlist) => {
    setWishlistItems(newWishlist);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };


  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-2'>
            <Sidebar handlePriceFilter={handlePriceFilter} />
          </div>
          <div className='col-10'>
            <ProductPage priceFilter={priceFilter} updateDataInWishList={updateDataInWishList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;