import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProviders = createAsyncThunk(
  "providers/fetchProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/provider/get",
        {
          withCredentials: true,
        }
      );
      return response.data;
      
    } catch (error) {
      console.error("Error fetching providers:", error);

      return rejectWithValue(
        error.response?.data?.message || "Error fetching providers"
      );
    }
  }
);

// Fetch provider by ID
export const fetchProviderById = createAsyncThunk(
  "providers/fetchProviderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/provider/get/${id}`, 
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching provider by ID:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error fetching provider by ID"
      );
    }
  }
);
