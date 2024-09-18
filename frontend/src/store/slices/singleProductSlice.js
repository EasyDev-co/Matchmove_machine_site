import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import { fetchWithAuth } from "../../utils/authUtils";

const initialState = {
  singleProduct: null, 
  status: "idle",
  error: null,
};

// fetching  by ID
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/products/v1/products/${id}/`, {
        method: "GET",
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


const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default singleProductSlice.reducer;
