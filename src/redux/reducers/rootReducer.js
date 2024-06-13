import { combineReducers } from 'redux';
import cartReducer from './cartReducer'; // Replace with your actual cart reducer file

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers here if needed
});

export default rootReducer;
