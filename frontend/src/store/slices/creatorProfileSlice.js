
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config'; 
import { fetchWithAuth } from '../../utils/authUtils';


const initialState = {
  profile: null,
  status: 'idle',
  error: null,
};

export const fetchCreatorProfile = createAsyncThunk(
  'creatorProfile/fetchCreatorProfile',
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/v1/user/${profileId}/`, {
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

const creatorProfileSlice = createSlice({
  name: 'creatorProfile',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchCreatorProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCreatorProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchCreatorProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error= action.payload
      })
  },
});

export default creatorProfileSlice.reducer;