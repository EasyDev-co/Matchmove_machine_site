import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import { fetchWithAuth } from "../../utils/authUtils";

const initialState = {
  singleProduct: null,
  status: {
    fetchProductStatus: "idle", 
    downloadProductStatus: null, 
    uploadProductStatus: null, // for upload
  },
  error: {
    fetchProductError: null,
    downloadProductError: null,
    uploadProductError: null, // for upload errors
  },
};

// fetching  by ID
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/products/v1/products/${id}/`, {
        method: "GET",
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

// Downloading file
export const downloadProductFile = createAsyncThunk(
  "singleProduct/downloadProductFile",
  async (file_id, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/products/v1/download/${file_id}/`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        return rejectWithValue(errorDetails);
      }

      return response.blob(); // assuming the file is downloaded as a blob
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Uploading form and file
export const uploadProductFile = createAsyncThunk(
  "singleProduct/uploadProductFile",
  async ({ formData, file }, { rejectWithValue }) => {
    try {
      const uploadData = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        uploadData.append(key, value);
      }
      // Append file
      uploadData.append("file", file);

      const response = await fetchWithAuth(`${BASE_URL}/products/v1/upload/`, {
        method: "POST",
        body: uploadData,
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



const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status.fetchProductStatus = "loading";
        state.error.fetchProductError = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status.fetchProductStatus = "succeeded";
        state.singleProduct = action.payload;
        state.error.fetchProductError = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status.fetchProductStatus = "failed";
        state.error.fetchProductError = action.payload;
      })

      // Download product file
      .addCase(downloadProductFile.pending, (state) => {
        state.status.downloadProductStatus = "loading";
        state.error.downloadProductError = null;
      })
      .addCase(downloadProductFile.fulfilled, (state, action) => {
        state.status.downloadProductStatus = "succeeded";
        state.error.downloadProductError = null;

        const url = URL.createObjectURL(action.payload); // create a download URL from the blob
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "product_file"); // you can give the file any name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // clean up the URL
      })
      .addCase(downloadProductFile.rejected, (state, action) => {
        state.status.downloadProductStatus = "failed";
        state.error.downloadProductError = action.payload;
      })

      // Upload product file
      .addCase(uploadProductFile.pending, (state) => {
        state.status.uploadProductStatus = "loading";
        state.error.uploadProductError = null;
      })
      .addCase(uploadProductFile.fulfilled, (state, action) => {
        state.status.uploadProductStatus = "succeeded";
        state.error.uploadProductError = null;
      })
      .addCase(uploadProductFile.rejected, (state, action) => {
        state.status.uploadProductStatus = "failed";
        state.error.uploadProductError = action.payload || action.error.message;
      });
  },
});

export default singleProductSlice.reducer;