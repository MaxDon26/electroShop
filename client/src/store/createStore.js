import categoryReducer from "./category";
import productReducer from "./product";
import vendorReducer from "./vendor";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  category: categoryReducer,
  vendor: vendorReducer,
  product: productReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
