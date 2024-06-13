// CartPage.js
import React, { useState, useEffect } from 'react';
import './CartPage.css'; // Import the CSS file

const CartPage = ({ cartItems, updateDataInCartList }) => {

  const [cart, setCart] = useState(cartItems);
  console.log("cart", cart);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  useEffect(() => {
    // Fetch data using Axios when the component mounts
    if (localStorage.getItem("productWishlist")) {
      var storeLocale = JSON.parse(localStorage.getItem("productWishlist"));
      const filteredItems = storeLocale.filter(item => item.addCart === true);
      setCart(filteredItems);
    }
  }, []);

  const updateLocalStorage = (updatedCart) => {
    const storeLocale = JSON.parse(localStorage.getItem("productWishlist"));
    const updatedProducts = storeLocale.map((product) => {
      const cartItem = updatedCart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, quantity: cartItem.quantity };
      }
      return product;
    });
    localStorage.setItem("productWishlist", JSON.stringify(updatedProducts));
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    }
  };

  const handleRemove = (index, item) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    var storeLocale = JSON.parse(localStorage.getItem("productWishlist"));
    const updatedProducts = storeLocale.map((product) => {
      if (product.id === item.id && product.addCart) {
        return { ...product, addCart: false };
      }
      return product;
    });
    localStorage.setItem("productWishlist", JSON.stringify(updatedProducts));
    updateDataInCartList(updatedProducts.length);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-content">
                  <div>
                    <img src={item.images} className="Cartimg" alt={item.title} />
                    <span className="cart-title">{item.title}</span>
                  </div>
                  {console.log("item", item)}
                  <div>
                    <button onClick={() => handleDecrement(index)}>-</button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="cart-quantity">{item.quantity || 1}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button onClick={() => handleIncrement(index)}>+</button>
                    <span className="cart-price">${item.price * (item.quantity || 1)}</span>
                    <button onClick={() => handleRemove(index, item)} className="remove-button">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <p>Total Price: ${getTotalPrice()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
