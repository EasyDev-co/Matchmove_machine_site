import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config';

const initialState = {
  detailTutorials: null,
  status: 'idle',
  error: null,
};

export const fetchDetailTutorials = createAsyncThunk(
  'detailTutorials/fetchDetailTutorials',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/v1/tutorials/${id}/`, {
        method: 'GET',
        // mode: 'no-cors',
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

const detailTutorialSlice = createSlice({
  name: 'detailTutorials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailTutorials.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDetailTutorials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detailTutorials = action.payload; // Исправлено: detailTutorials, а не tutorials
      })
      .addCase(fetchDetailTutorials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default detailTutorialSlice.reducer;