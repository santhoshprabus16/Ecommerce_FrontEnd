// WishlistPage.js
import React, { useEffect, useState } from 'react';
import Home from './Home';
import './WishlistPage.css';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

const WishlistPage = ({ updateDataInCartList }) => {
  const [showProducts, setShowProducts] = useState([]);
  let [showMasterProducts, setMasterProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch data using Axios when the component mounts
    if (localStorage.getItem("productWishlist")) {

      var storeLocale = JSON.parse(localStorage.getItem("productWishlist"))
      const filteredItems = storeLocale.filter(item => item.wishlist === true);
      setMasterProducts(storeLocale);
      setShowProducts(filteredItems);
    }
  }, []);

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleAddToCart = (data) => {

    showMasterProducts = JSON.parse(localStorage.getItem("productWishlist"));
    const updatedProducts = showMasterProducts.map((product) => {
      if (product.id === data.id && !product.addCart) {
        return { ...product, addCart: true };
      }
      return product;
    });

    localStorage.setItem("productWishlist", JSON.stringify(updatedProducts));
    setShowProducts(updatedProducts.filter(item => item.wishlist === true));
    refreshCartList();
  };

  function refreshCartList() {
    if (localStorage.getItem("productWishlist")) {

      var storeLocale = JSON.parse(localStorage.getItem("productWishlist"))
      const filteredItems = storeLocale.filter(item => item.addCart === true);
      console.log(filteredItems);
      updateDataInCartList(filteredItems.length);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div className={`${showProducts.length == 0 ? 'cart-container ' : 'product-container'}`}>

      {showProducts.length === 0 ? (
        <p>Your WhishList is empty.</p>) : (
        <div className="wishlist-container">
          <div className='row'>
            {showProducts.map((data, index) => (
              <div className='col-4 my-2 text-start' key={index}>
                <div className='card'>
                  <div className='slider'>
                    <img className="d-block w-100" src={data.images[0]} alt={data.title} />
                  </div>
                  <div className='title'>
                    <h2 className='text-start'>
                      {data.title}
                    </h2>
                  </div>
                  <div className='description'>
                    <p className='text-start'>
                      {[...data.description].map((text, ind) => {
                        if (ind <= 20) return text;
                      })}...
                    </p>
                  </div>
                  <div className='card-footer'>
                    <span>
                      <button className='btn btn-primary' onClick={() => handleClickOpen(data)}>View Details</button>
                    </span>
                    <span>
                      {/* Use a callback to add to cart without navigating to /cart */}
                      <button className='btn btn-secondary' disabled={data.addCart} onClick={() => handleAddToCart(data)}>Add To Cart</button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Dialog
            fullWidth={'100%'}
            maxWidth='md'
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>{selectedProduct?.title}</DialogTitle>
            <DialogContent>
              <Box
                noValidate
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
                }}
              >
                <div>
                  <img src={selectedProduct?.images[0]} alt={selectedProduct?.title} style={{ width: '100%', height: 'auto' }} />
                  <p>{selectedProduct?.description}</p>
                  <p>Rating: {selectedProduct?.rating}</p>
                  <p>Price: ${selectedProduct?.price}</p>
                </div>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>)}
    </div>
  );
};

export default WishlistPage;