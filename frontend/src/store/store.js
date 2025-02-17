import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './slices/productSlice';
import singleProductReducer from './slices/singleProductSlice';
import optionsReducer from './slices/optionsSlice';
import profileReducer from './slices/profileSlice';
import cartReducer from './slices/cartSlice';
import profileProductReducer from './slices/profileProductSlice';
import paymentReducer from './slices/paymentSlice';
import orderReducer from './slices/orderSlice';
import qrReducer from './slices/qrSlice';
import creatorProfileReducer from "./slices/creatorProfileSlice"
import topContribiutorsSlice from "./slices/topContributorsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    singleProduct: singleProductReducer,
    options: optionsReducer,
    profile: profileReducer,
    cart: cartReducer,
    profileProduct: profileProductReducer,
    payment: paymentReducer,
    order: orderReducer,
    qr:qrReducer,
    creatorProfile:creatorProfileReducer,
    topContribiutors: topContribiutorsSlice,
  },
});

export default store;