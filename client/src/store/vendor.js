import { createSlice } from "@reduxjs/toolkit";
import vendorService from "../services/vendor.service";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    vendorRequested: (state) => {
      state.isLoading = true;
    },
    vendorRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    vendorRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: vendorReducer, actions } = vendorSlice;

const { vendorRecieved, vendorRequestFiled, vendorRequested } = actions;

export const loadVendors = () => async (dispatch) => {
  dispatch(vendorRequested());
  try {
    const { content } = await vendorService.get();
    dispatch(vendorRecieved(content));
  } catch (error) {
    dispatch(vendorRequestFiled(error.message));
  }
};

export const getVendorStatus = () => (state) => state.vendor.isLoading;
export const getVendors = () => (state) => {
  return state.vendor.entities;
};
export const getVendorById = (id) => (state) => {
  return state.vendor.entities?.find((el) => el._id === id);
};

export default vendorReducer;
