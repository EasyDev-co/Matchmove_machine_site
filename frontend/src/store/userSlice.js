import BASE_URL from '../config';  // Make sure this path is correct
import Cookies from 'js-cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../utils/authUtils';

const initialState = {
  user: null,
  isAuthenticated: !!Cookies.get('access_token'),
  accessToken: Cookies.get('access_token') || null,
  refreshToken: Cookies.get('refresh_token') || null,
  status: 'idle',
  error: null,
};

// Thunks
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/v1/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Server responded with error:', errorDetails);
        return rejectWithValue(errorDetails);
      }

      return await response.json(); // Return successful response data
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/v1/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUserThunk',
  async (_, { getState, rejectWithValue }) => {
    const { refreshToken } = getState().user;

    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/v1/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Logout failed:', errorDetails);
        return rejectWithValue(errorDetails);
      }

      return 'Logged out'
    } catch (error) {
      console.error('Error logging out:', error);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      Cookies.set('access_token', action.payload.access, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('refresh_token', action.payload.refresh, { expires: 7, secure: true, sameSite: 'Strict' });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        Cookies.set('access_token', action.payload.access, { expires: 7, secure: true, sameSite: 'Strict' });
        Cookies.set('refresh_token', action.payload.refresh, { expires: 7, secure: true, sameSite: 'Strict' });
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // Handle registration success if needed
      })

      // Handling logout actions
      .addCase(logoutUserThunk.pending, (state) => {
        state.status = 'logging out';
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        state.status = 'logged out';
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.status = 'logout failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setTokens } = userSlice.actions;
export default userSlice.reducer;
