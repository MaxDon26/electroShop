import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    categoryRequested: (state) => {
      state.isLoading = true;
    },
    categoryRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoryRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;

const { categoryRecieved, categoryRequestFiled, categoryRequested } = actions;

export const loadCategories = () => async (dispatch) => {
  dispatch(categoryRequested());
  try {
    const { content } = await categoryService.get();
    dispatch(categoryRecieved(content));
  } catch (error) {
    dispatch(categoryRequestFiled(error.message));
  }
};

export const getCategoryById = (id) => (state) => {
  return state.category.entities.find((el) => el._id === id);
};

export const getCategoryStatus = () => (state) => state.category.isLoading;

export default categoryReducer;
