import BASE_URL from '../../config';  // Make sure this path is correct
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
};

// Thunks
export const sendContactUs = createAsyncThunk(
  'contactUs/sendContactUs',
  async (data, { rejectWithValue }) => {
    try {
      // Сначала проверяем reCAPTCHA
      const recaptchaResponse = await fetch(`${BASE_URL}/users/v1/verify_recaptcha/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recaptcha_token: data.recaptcha_token }),
      });

      if (!recaptchaResponse.ok) {
        const errorDetails = await recaptchaResponse.json();
        console.error('reCAPTCHA verification failed:', errorDetails);
        return rejectWithValue(errorDetails);
      }

      // Если reCAPTCHA прошла проверку, отправляем основную форму
      const response = await fetch(`${BASE_URL}/users/v1/contact_us/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

const sendContactUsSlice = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(sendContactUs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
       })
       .addCase(sendContactUs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
       })
       .addCase(sendContactUs.rejected, (state, action) => {
        state.status = 'failed';
        state.error= action.payload
       })
  },
});

export default sendContactUsSlice.reducer;

// import BASE_URL from '../../config';  // Make sure this path is correct
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   status: 'idle',
//   error: null,
// };

// // Thunks
// export const sendContactUs = createAsyncThunk(
//   'contactUs/sendContactUs',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/v1/contact_us/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const errorDetails = await response.json();
//         console.error('Server responded with error:', errorDetails);
//         return rejectWithValue(errorDetails);
//       }

//       return await response.json(); // Return successful response data
//     } catch (error) {
//       console.error('Error:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const sendContactUsSlice = createSlice({
//   name: 'contactUs',
//   initialState,
//   reducers: {
//     setEmail(state, action) {
//       state.email = action.payload; 
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//        .addCase(sendContactUs.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//        })
//        .addCase(sendContactUs.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.error = null;
//        })
//        .addCase(sendContactUs.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error= action.payload
//        })
//   },
// });

// export default sendContactUsSlice.reducer;
