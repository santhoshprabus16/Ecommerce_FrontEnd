import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, UPDATE_WISH_ITEM_COUNT } from '../actions/cartActionTypes';

const initialState = {
  cart: [],
  wishItemCount: 0, // Add wishItemCount to the initial state
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case UPDATE_WISH_ITEM_COUNT:
      return {
        ...state,
        wishItemCount: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
