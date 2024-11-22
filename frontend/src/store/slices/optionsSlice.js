import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import Cookies from 'js-cookie';

const initialState = {
  cameras: [],
  formats: [],
  lenses: [],
  status: 'idle',
  error: null
};

export const fetchCameras = createAsyncThunk(
  'options/fetchCameras',
  async (_, { rejectWithValue }) => {

    try {
      const response = await fetch(`${BASE_URL}/products/v1/cameras/`, {
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

export const fetchFormats = createAsyncThunk(
  'options/fetchFormats',
  async (_, { rejectWithValue }) => {

    try {
      const response = await fetch(`${BASE_URL}/products/v1/formats/`, {
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

export const fetchLenses = createAsyncThunk(
  'options/fetchLenses',
  async (_, { rejectWithValue }) => {

    try {
      const response = await fetch(`${BASE_URL}/products/v1/lenses/`, {
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

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cameras
      .addCase(fetchCameras.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cameras = action.payload;
      })
      .addCase(fetchCameras.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Formats
      .addCase(fetchFormats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formats = action.payload;
      })
      .addCase(fetchFormats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Lenses
      .addCase(fetchLenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lenses = action.payload;
      })
      .addCase(fetchLenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default optionsSlice.reducer;
