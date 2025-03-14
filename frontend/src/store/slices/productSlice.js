import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

//  thunk for fetching 
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, pageSize, camera, lens, format, accessType, price__gte, price__lte, search }, { rejectWithValue }) => {
    try {
      // Initialize URLSearchParams with common parameters
      const queryParams = new URLSearchParams({
        page,
        page_size: pageSize,
        access_type: accessType,
        search: search,
        file_format: format
      });

      // Append each camera as a separate parameter
      if (camera && camera.length > 0) {
        camera.forEach(cam => {
          queryParams.append('camera', cam);
        });
      }

      // Append each lens as a separate parameter
      if (lens && lens.length > 0) {
        lens.forEach(l => {
          queryParams.append('lens', l);
        });
      }

      // Convert query parameters to string
      const queryString = queryParams.toString();

      const response = await fetch(`${BASE_URL}/products/v1/approved-products/?${queryString}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorDetails = await response.json();
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
