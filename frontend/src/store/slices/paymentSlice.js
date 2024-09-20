import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import { fetchWithAuth } from "../../utils/authUtils";

export const postPayment = createAsyncThunk(
    'payment/postPayment',
    async (_, {rejectWithValue})=>{
        try {
            const response = await fetchWithAuth(`${BASE_URL}/payments/v1/transactions/create/`, {
                method: 'POST'
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
)

const initialState={
    status:'idle',
    error: null
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postPayment.pending, (state) => {
                state.status = 'loading';
                state.error = null; 
            })
            .addCase(postPayment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.paymentData = action.payload; 
                state.error = null; 
            })
            .addCase(postPayment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    }
});

export default paymentSlice.reducer;