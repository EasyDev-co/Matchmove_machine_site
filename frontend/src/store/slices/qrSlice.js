import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to generate QR code using fetch
export const generateQRCode = createAsyncThunk(
  'qr/generateQRCode',
  async ({ data, logo }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.qrcode-monkey.com/qr/custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: data,
          config: {
            body: 'leaf',
            eye: 'frame13',
            eyeBall: 'ball15',
            bodyColor: '#282828D9',
            bgColor: '#FFFFFF',
            logoMode: 'default',
          },
          size: 300,
          file: 'png',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }

      // Return the generated QR code URL
      const qrCodeBlob = await response.blob();
      const qrCodeUrl = URL.createObjectURL(qrCodeBlob); 

      return qrCodeUrl; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);

const qrSlice = createSlice({
  name: 'qr',
  initialState: {
    qrCodeUrl: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateQRCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQRCode.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCodeUrl = action.payload; 
      })
      .addCase(generateQRCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default qrSlice.reducer;