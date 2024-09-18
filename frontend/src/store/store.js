import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './slices/productSlice';
import singleProductReducer from './slices/singleProductSlice';
import optionsReducer from './slices/optionsSlice';
import profileReducer from './slices/profileSlice';
import cartReducer from './slices/cartSlice';
import cartItemReducer from './slices/cartItemSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    singleProduct: singleProductReducer,
    options: optionsReducer,
    profile: profileReducer,
    cart: cartReducer,
    cartItem: cartItemReducer
  },
});

export default store;