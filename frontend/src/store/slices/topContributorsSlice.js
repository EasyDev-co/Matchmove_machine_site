import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config'; 
import { fetchWithAuth } from '../../utils/authUtils';


const initialState = {
  top: null,
  status: 'idle',
  error: null,
};

export const fetchTopContributors = createAsyncThunk(
  'topContributors/fetchTopContributors',
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetch");
      const response = await fetch(`${BASE_URL}/users/v1/ranked/`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.log("errors detail", errorDetails);
        return rejectWithValue(errorDetails);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const topContributorsSlice = createSlice({
  name: 'topContributors',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchTopContributors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopContributors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.top = action.payload;
      })
      .addCase(fetchTopContributors.rejected, (state, action) => {
        state.status = 'failed';
        state.error= action.payload
      })
  },
});

export default topContributorsSlice.reducer;