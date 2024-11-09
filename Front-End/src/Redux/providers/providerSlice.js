import { createSlice } from "@reduxjs/toolkit";
import { fetchProviders, fetchProviderById } from "./providerThunk";

const providersSlice = createSlice({
  name: "providers",
  initialState: {
    providers: [],
    selectedProvider: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.providers = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //  fetch provider by ID
      .addCase(fetchProviderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderById.fulfilled, (state, action) => {
        state.selectedProvider = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchProviderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default providersSlice.reducer;
