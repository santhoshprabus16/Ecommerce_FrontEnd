import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './ProductPage.css';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navbar from '../Navbar';


const ProductPage = ({ priceFilter, updateDataInWishList }) => {
  let [products, setProducts] = useState([]);
  let [showProducts, setShowProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(selectedProduct);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToWishlist = (data) => {

    if (localStorage.getItem("productWishlist")) { products = JSON.parse(localStorage.getItem("productWishlist")) }
    const updatedProducts = products.map((product) => {
      if (product.id === data.id) {
        return { ...product, wishlist: !product.wishlist };
      }
      return product;
    });
    // Update the state with the new array
    setProducts(updatedProducts);
    // Update the showProducts state using the callback form
    setShowProducts((prevProducts) => [...prevProducts]);
    localStorage.setItem("productWishlist", JSON.stringify(updatedProducts));
    refreshWishList();
  };

  function refreshWishList() {
    if (localStorage.getItem("productWishlist")) {

      var storeLocale = JSON.parse(localStorage.getItem("productWishlist"))
      const filteredItems = storeLocale.filter(item => item.wishlist === true);
      updateDataInWishList(filteredItems.length);
    }
  }
  const handleAddToCart = (data) => {

    var showMasterProducts; var updatedProducts;
    if (localStorage.getItem("productWishlist")) {
      showMasterProducts = JSON.parse(localStorage.getItem("productWishlist"));
      updatedProducts = showMasterProducts.map((product) => {
        if (product.productId === data.productId && !product.addCart) {
          return { ...product, addCart: true };
        }
        return product;
      });
    } else {
      updatedProducts = showProducts.map((product) => {
        if (product.productId === data.productId && !product.addCart) {
          return { ...product, addCart: true };
        }
        return product;
      });
    }
    localStorage.setItem("productWishlist", JSON.stringify(updatedProducts));
    setShowProducts(JSON.parse(localStorage.getItem("productWishlist")));
    updateDataInWishList(updatedProducts.length);
  };
  useEffect(() => {

    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/product/allProduct')
      .then(response => {
        var storeLocale = [];
        var storeMaster = [];
        if (localStorage.getItem("productWishlist")) {
          storeLocale = JSON.parse(localStorage.getItem("productWishlist"))
          setProducts(storeLocale);
          setShowProducts(storeLocale);
        } else {
          setProducts(response.data);
          setShowProducts(response.data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Apply price filter if provided
    if (priceFilter) {
      const filteredProducts = products.filter(product =>
        product.price >= priceFilter.min && product.price <= priceFilter.max
      );
      setShowProducts(filteredProducts);
    } else {
      // Reset the filter
      setShowProducts(products);
    }
  }, [priceFilter, products]);

  return (
    <div className="product-container">
      <div className='row'>
        {showProducts.map((data, index) => (

          <div className='col-4 my-2 text-start' key={index}>
            <div className='card'>
              <div className='slider'>
                <img className="d-block w-100" src={data?.images?.[0]} alt={data?.title} />
              </div>
              <div className='title'>
                <h2 className='text-start'>
                  {data.title}
                </h2>
                {/* {data.wishlist === true ? (
                  <Link onClick={() => handleAddToWishlist(data)}><FavoriteIcon /></Link>
                ) : (
                  <Link onClick={() => handleAddToWishlist(data)}><FavoriteBorderIcon /></Link>
                )} */}
              </div>
              <div className='description'>
                <p className='text-start'>
                  {[...data?.description].map((text, ind) => {
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
                  <button className='btn btn-secondary' disabled={data?.addCart} onClick={() => handleAddToCart(data)}>Add To Cart</button>
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
              <p>Price:{selectedProduct?.price}</p>
              <p>quantity:{selectedProduct?.quantity}</p>

            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductPage;
