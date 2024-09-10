import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:null,
    isAuthenticated :false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // reducers here
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;