import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config'; 
import { fetchWithAuth } from '../../utils/authUtils';

const initialState = {
    order:null,
    status: {
      fetchOrderStatus: 'idle',
      createOrderStatus: 'idle',
    },
    errors: {
      fetchOrderError: null,
      createOrderError: null,
    },
  };
  
  // Fetching order
  export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetchWithAuth(`${BASE_URL}/orders/v1/orders/`, {
          method: 'GET',
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
  
  // Creating an order
  export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetchWithAuth(`${BASE_URL}/orders/v1/orders/create/`, {
          method: 'POST',
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
  
  const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch Order
        .addCase(fetchOrder.pending, (state) => {
          state.status.fetchOrderStatus = 'loading';
          state.errors.fetchOrderError = null;
        })
        .addCase(fetchOrder.fulfilled, (state, action) => {
          state.status.fetchOrderStatus = 'succeeded';
          state.order = action.payload;
        })
        .addCase(fetchOrder.rejected, (state, action) => {
          state.status.fetchOrderStatus = 'failed';
          state.errors.fetchOrderError = action.payload;
        })
  
        // Create Order
        .addCase(createOrder.pending, (state) => {
          state.status.createOrderStatus = 'loading';
          state.errors.createOrderError = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.status.createOrderStatus = 'succeeded';
          state.order = action.payload
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.status.createOrderStatus = 'failed';
          state.errors.createOrderError = action.payload;
        });
    },
  });
  
  export default orderSlice.reducer;