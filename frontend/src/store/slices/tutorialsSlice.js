import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config'; 
import { fetchWithAuth } from '../../utils/authUtils';


const initialState = {
  tutorials: null,
  status: 'idle',
  error: null,
};

export const fetchTutorials = createAsyncThunk(
  'tutorials/fetchTutorials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/v1/tutorials/`, {
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

const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchTutorials.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tutorials = action.payload;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.status = 'failed';
        state.error= action.payload
      })
  },
});

export default tutorialsSlice.reducer;