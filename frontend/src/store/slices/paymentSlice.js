import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import { fetchWithAuth } from "../../utils/authUtils";

export const postPayment = createAsyncThunk(
    'payment/postPayment',
    async (orderData, { rejectWithValue }) => {

        console.log( JSON.stringify(orderData));
        
        try {
            const response = await fetchWithAuth(`${BASE_URL}/payments/v1/transactions/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.log(errorDetails);
                
                return rejectWithValue(errorDetails);
            }

            const res = response.json();
            console.log(res);
            return res
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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