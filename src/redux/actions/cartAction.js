import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, UPDATE_WISH_ITEM_COUNT } from './cartActionTypes';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateQuantity = (itemId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: {
    itemId,
    quantity,
  },
});

export const updateWishItemCount = (count) => ({
  type: UPDATE_WISH_ITEM_COUNT,
  payload: count,
});
