import BASE_URL from '../config';  // Make sure this path is correct
import Cookies from 'js-cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../utils/authUtils';

const initialState = {
  user: null,
  email: null,
  isAuthenticated: !!Cookies.get('access_token'),
  accessToken: Cookies.get('access_token') || null,
  refreshToken: Cookies.get('refresh_token') || null,
  status: {
    loginStatus: 'idle',
    registerStatus: 'idle',
    logoutStatus: 'idle',
    emailVerificationStatus: 'idle',
    resetPasswordStatus: 'idle',
    passwordChangeStatus: 'idle',
  },
  errors: {
    loginError: null,
    registerError: null,
    emailVerificationError: null,
    logoutError: null,
    resetPasswordError: null,
    passwordChangeError: null,
  },
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

export const verifyEmailCode = createAsyncThunk(
  'user/verifyEmailCode',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/v1/email_verification_code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Verification failed:', errorDetails);
        return rejectWithValue(errorDetails);
      }

      return await response.json();
      
    } catch (error) {
      console.error('Error verifying email:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (email, { rejectWithValue }) => {

      const response = await fetch(`${BASE_URL}/users/v1/reset_password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.log('Password reset failed:', errorDetails);
        return rejectWithValue(errorDetails);
      }

      return await response.json(); 

  }
);

export const changeResetPassword = createAsyncThunk(
  'user/hangeResetPassword',
  async (data, {rejectWithValue}) => {
    const response = await fetch(`${BASE_URL}/users/v1/change_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok){
      const errorDetails = await response.json();
      return rejectWithValue(errorDetails)
    }

    const res = await response.json()
    
    return res
  }
)

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
    setEmail(state, action) {
      state.email = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling login actions
      .addCase(loginUser.pending, (state) => {
        state.status.loginStatus = "loading";
        state.errors.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.user
        Cookies.set("access_token", action.payload.access, {
          sameSite: "Strict",
          secure: true,
        });
        Cookies.set("refresh_token", action.payload.refresh, {
          sameSite: "Strict",
          secure: true,
        });
        state.status.loginStatus = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status.loginStatus = "failed";
        state.errors.loginError = action.payload || action.error.message;
      })

      // Handling register actions
      .addCase(registerUser.pending, (state) => {
        state.status.registerStatus = "loading";
        state.errors.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status.registerStatus = "succeeded";
        state.errors.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status.registerStatus = "failed";
        state.errors.registerError = action.payload
      })

      .addCase(verifyEmailCode.pending, (state) => {
        state.status.emailVerificationStatus = "loading";
        state.errors.emailVerificationError = null;
      })
      .addCase(verifyEmailCode.fulfilled, (state, action) => {
        state.status.emailVerificationStatus = "succeeded";
        state.errors.emailVerificationError = null;

        // Set tokens from the response
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;

        // Save tokens to cookies
        Cookies.set("access_token", action.payload.access, {
          sameSite: "Strict",
          secure: true,
        });
        Cookies.set("refresh_token", action.payload.refresh, {
          sameSite: "Strict",
          secure: true,
        });

        state.isAuthenticated = true; // Update authentication status
      })
      .addCase(verifyEmailCode.rejected, (state, action) => {
        state.status.emailVerificationStatus = "failed";
        state.errors.emailVerificationError = action.payload
      })

      // Handling reset password
      .addCase(resetPassword.pending, (state) => {
        state.status.resetPasswordStatus = "loading";
        state.errors.resetPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status.resetPasswordStatus = "succeeded";
        state.errors.resetPasswordError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status.resetPasswordStatus = "failed";
        state.errors.resetPasswordError = action.payload
      })

       
       .addCase(changeResetPassword.pending, (state) => {
        state.status.passwordChangeStatus = "loading"
        state.errors.passwordChangeError = null
       })
       .addCase(changeResetPassword.fulfilled, (state, action) => {
        state.status.passwordChangeStatus = "succeeded"
        state.errors.passwordChangeError = null
       })
       .addCase(changeResetPassword.rejected, (state, action) => {
        state.status.passwordChangeStatus = "failed"
        state.errors.passwordChangeError = action.payload
       })

      // Handling logout actions
      .addCase(logoutUserThunk.pending, (state) => {
        state.status.logoutStatus = "loading";
        state.errors.logoutError = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        state.status.logoutStatus = "succeeded";
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.status.logoutStatus = "failed";
        state.errors.logoutError = action.payload || action.error.message;
      });
  },
});

export const { setEmail} = userSlice.actions;
export default userSlice.reducer;
