import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config';
import { fetchWithAuth } from '../../utils/authUtils';

// Thunks
export const postCartItem = createAsyncThunk(
  'cart/postCartItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/cart/v1/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: id, quantity: 1 }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        return rejectWithValue(errorDetails);
      }

      const res = await response.json();

      return res
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/cart/v1/cart/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        return rejectWithValue(errorDetails);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/cart/v1/cart/`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        return rejectWithValue(errorDetails);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  cart: {
    id: null,
    is_active: false,
    items: [], 
    total_price: 0,
    user: null,
  }, 
  postCartItemStatus: 'idle',
  postCartItemError: null,
  deleteCartItemStatus: 'idle',
  deleteCartItemError: null,
  fetchCartStatus: 'idle',
  fetchCartError: null,
};

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Post Cart Item
    builder
    .addCase(postCartItem.pending, (state) => {
      state.postCartItemStatus = 'loading';
    })
    .addCase(postCartItem.fulfilled, (state, action) => {
      state.postCartItemStatus = 'succeeded';
      state.cart.items.push(action.payload);
      state.cart.total_price =+ action.payload.total_price
    })
    .addCase(postCartItem.rejected, (state, action) => {
      state.postCartItemStatus = 'failed';
      state.postCartItemError = action.payload
    });

  // Delete Cart Item
  builder
    .addCase(deleteCartItem.pending, (state) => {
      state.deleteCartItemStatus = 'loading';
    })
    .addCase(deleteCartItem.fulfilled, (state, action) => {
      state.deleteCartItemStatus = 'succeeded';
      const deletingItem = state.cart.items.find(item => item.id === action.payload);
      state.cart.total_price = state.cart.total_price - deletingItem.price;
      state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
      
    })
    .addCase(deleteCartItem.rejected, (state, action) => {
      state.deleteCartItemStatus = 'failed';
      state.deleteCartItemError = action.payload
    });

  // Fetch Cart
  builder
    .addCase(fetchCart.pending, (state) => {
      state.fetchCartStatus = 'loading';
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.fetchCartStatus = 'succeeded';
      state.cart = action.payload;
    })
    .addCase(fetchCart.rejected, (state, action) => {
      state.fetchCartStatus = 'failed';
      state.fetchCartError = action.payload
    });
},
});

export default cartSlice.reducer;