// Navbar.js
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Import the register icon
import { Link } from 'react-router-dom';

const Navbar = ({ toggleDarkMode, wishItemCount, WishcartCount }) => {
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const [cartlistItemCount, setCartlistItemCount] = useState(0);
  const [globalSearch, setglobalSearch] = useState('');

  useEffect(() => {
    // Fetch data using Axios when the component mounts
    if (localStorage.getItem("productWishlist")) {
      var storeLocale = JSON.parse(localStorage.getItem("productWishlist"));
      const filteredItems = storeLocale.filter(item => item.wishlist === true);
      setWishlistItemCount(filteredItems.length);
      const filteredCartItems = storeLocale.filter(item => item.addCart === true);
      setCartlistItemCount(filteredCartItems.length);
    }
  }, [wishItemCount, WishcartCount]);

  function logout() {
    localStorage.removeItem("carttoken");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            src="https://banner2.cleanpng.com/20180807/ysj/kisspng-responsive-web-design-website-development-e-commer-5b69834be31cc0.2827101115336415479303.jpg"
            alt="Logo"
            className="logo"
          />
        </Link>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search" className="search-bar" />
      </div>
      <div className="navbar-right">
        <button className="nav-button" onClick={toggleDarkMode}>
          <Brightness4Icon /> Toggle Mode
        </button>
        {/* <Link to="/wishlist" className="nav-button">
          <FavoriteIcon /> Wishlist ({wishlistItemCount})
        </Link> */}
        <Link to="/cart" className="nav-button">
          <ShoppingCartIcon /> Cart ({cartlistItemCount})
        </Link>
        {/* <Link to="/register" className="nav-button">
          <PersonAddIcon /> Register
        </Link> */}
        <Link to="/login" onClick={logout} className="nav-button">
          <AccountCircleIcon /> Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
