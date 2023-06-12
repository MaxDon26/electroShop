import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productSlice = createSlice({
  name: "product",
  initialState: {
    entities: null,
    names: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    productRequested: (state) => {
      state.isLoading = true;
    },
    productRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    namesRecieved: (state, action) => {
      state.names = action.payload;
    },
    productRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: productReducer, actions } = productSlice;

const {
  productRecieved,
  productRequestFiled,
  productRequested,
  namesRecieved,
} = actions;

export const loadProductsNames = () => async (dispatch) => {
  try {
    const { content } = await productService.getProductsNames();
    dispatch(namesRecieved(content));
  } catch (error) {
    dispatch(productRequestFiled(error.message));
  }
};

export const loadPopularProducts = () => async (dispatch) => {
  dispatch(productRequested());
  try {
    const { content } = await productService.getPupular();
    dispatch(productRecieved(content));
  } catch (error) {
    dispatch(productRequestFiled(error.message));
  }
};

export const getFiltredProducts = (params) => async (dispatch) => {
  dispatch(productRequested());
  try {
    const { content } = await productService.getFiltredProduct(params);
    dispatch(productRecieved(content));
  } catch (error) {
    dispatch(productRequestFiled(error.message));
  }
};

export const getProducts = () => (state) => state.product.entities;

export const getProductsStatus = () => (state) => state.product.isLoading;

export default productReducer;
