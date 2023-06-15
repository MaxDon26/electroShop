import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";
import localStorageService from "../services/localStorage.service";

const initialState = {
  entities: null,
  names: null,
  isLoading: true,
  error: null,
  basket: {
    isOpen: false,
    order: localStorageService.getOrder() || [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
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
    basketOpened: (state) => {
      state.basket.isOpen = !state.basket.isOpen;
    },
    basketAdded: (state, action) => {
      const finded = state.basket.order.find(
        (el) => el._id === action.payload.product._id
      );

      if (!finded) {
        state.basket.order.push({ ...action.payload.product, count: 1 });
      } else {
        state.basket.order = state.basket.order.map((ord) =>
          ord._id === action.payload.product._id
            ? {
                ...ord,
                count: ord.count >= 1 ? ord.count + action.payload.order : 1,
              }
            : ord
        );
      }
    },
    basketRemoved: (state, action) => {
      state.basket.order = state.basket.order.filter(
        (ord) => ord._id !== action.payload
      );
    },
  },
});

const { reducer: productReducer, actions } = productSlice;

const {
  productRecieved,
  productRequestFiled,
  productRequested,
  namesRecieved,
  basketAdded,
  basketOpened,
  basketRemoved,
} = actions;

export const loadProductsNames = () => async (dispatch) => {
  try {
    const { content } = await productService.getProductsNames();
    dispatch(namesRecieved([...new Set(content)]));
  } catch (error) {
    dispatch(productRequestFiled(error.message));
  }
};

export const toggleBasket = () => (dispatch) => {
  dispatch(basketOpened());
};

export const getOrder = () => (state) => state.product.basket.order;

export const addOrder =
  (id, order = 1) =>
  (dispatch, getState) => {
    // const finded = getState().product.basket.order.find(ord => ord._id ===id);
    const product = getState().product.entities.find((prod) => prod._id === id);

    dispatch(basketAdded({ product, order }));

    localStorageService.addOrder(getState().product.basket.order);
  };

export const removeOrder = (id) => (dispatch, getState) => {
  dispatch(basketRemoved(id));

  localStorageService.addOrder(getState().product.basket.order);
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

export const getProductById = (id) => (state) =>
  state.product.entities?.find((prod) => prod._id === id);

export const getProductsStatus = () => (state) => state.product.isLoading;

export default productReducer;
