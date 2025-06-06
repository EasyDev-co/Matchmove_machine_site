
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../../config'; 
import { fetchWithAuth } from '../../utils/authUtils';


const initialState = {
  profile: null,
  status: {
    fetchUserProfileStatus: 'idle',
    updateUserProfileStatus: 'idle',
    changePasswordStatus: 'idle',
  },
  errors: {
    fetchUserProfileError: null,
    updateUserProfileError: null,
    changePasswordError: null,
  },
};

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/v1/user/`, {
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

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/v1/user/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.log('говной1')
        return rejectWithValue(errorDetails);
      }

      return response.json();
    } catch (error) {
      console.log('говной2')
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  'profile/updateProfilePicture',
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/v1/user/`, {
        method: 'PATCH',
        body: formData,
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

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/v1/parent/change_password/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        // Важно: парсим ошибку как JSON
        const errorData = await response.json();
        return rejectWithValue(errorData); // Передаем объект ошибки целиком
      }

      return await response.json();
    } catch (error) {
      // Только для сетевых ошибок
      return rejectWithValue({ message: error.message });
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.profile = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status.fetchUserProfileStatus = 'loading';
        state.errors.fetchUserProfileError = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status.fetchUserProfileStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status.fetchUserProfileStatus = 'failed';
        state.errors.fetchUserProfileError = action.payload
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status.updateUserProfileStatus = 'loading';
        state.errors.updateUserProfileError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status.updateUserProfileStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status.updateUserProfileStatus = 'failed';
        state.errors.updateUserProfileError = action.payload
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.status.changePasswordStatus = 'loading';
        state.errors.changePasswordError = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status.changePasswordStatus = 'succeeded';
        // Optionally handle success, like showing a success message
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status.changePasswordStatus = 'failed';
        state.errors.changePasswordError = action.payload
      });
  },
});

export const { resetProfile } = profileSlice.actions;

export default profileSlice.reducer;