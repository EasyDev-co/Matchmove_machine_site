import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config';
import { fetchWithAuth } from '../../utils/authUtils';

const initialState = {
    userProducts: [],
    status: 'idle',
    error: null,
};

export const fetchUserProducts = createAsyncThunk(
    "userProducts/fetchUserProducts",
    async ({ page, pageSize }, { rejectWithValue }) => {
      try {
        const response = await fetchWithAuth(`${BASE_URL}/products/v1/user-products/?page=${page}&page_size=${pageSize}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error('Server responded with error:', errorDetails);
          return rejectWithValue(errorDetails);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error:', error);
        return rejectWithValue(error.message);
      }
    }
  );
  

  const profileProductSlice = createSlice({
    name: "profileProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.userProducts = action.payload;
        })
        .addCase(fetchUserProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload; // Set error to the payload
        });
    },
  });
  
  export default profileProductSlice.reducer;
