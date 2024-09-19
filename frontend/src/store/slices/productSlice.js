import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config';
import { fetchWithAuth } from '../../utils/authUtils';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

//  thunk for fetching 
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, pageSize, camera, lens, file_format, accessType, price__gte, price__lte, search }, { rejectWithValue }) => {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        page,
        page_size: pageSize,
        access_type: accessType,
        search,
        ...(camera && { camera }),
        ...(lens && { lens }),
        ...(file_format && { file_format }),
        ...(price__gte && { price__gte }),
        ...(price__lte && { price__lte }),
      }).toString();

      console.log(queryParams);
      

      const response = await fetchWithAuth(`${BASE_URL}/products/v1/products/?${queryParams}`, {
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;
