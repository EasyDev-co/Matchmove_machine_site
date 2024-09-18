import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config'; 
import { fetchWithAuth } from '../../utils/authUtils';


export const postCartItem = createAsyncThunk(
  'cart/postCartItem',
  async ( id, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/cart/v1/cart/${id}/`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        return rejectWithValue(errorDetails);
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
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

const cartItemSlice = createSlice({
  name: 'cartItem',
  initialState: {
    cartItem: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(postCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartItemSlice.reducer;
