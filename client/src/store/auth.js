import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const initialState = localStorageService.getAccessToken()
  ? {
      isLoading: false,
      error: null,
      auth: {
        userId: localStorageService.getUserId(),
        role: localStorageService.getUserRole(),
      },
      isLoggedIn: true,
    }
  : {
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequested: (state, action) => {
      state.isLoading = true;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },

    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },

    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: authReducer, actions } = authSlice;
const { authRequested, authRequestFailed, authRequestSuccess, userLoggedOut } =
  actions;

export const login = (payload, navigate) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    const { user } = data;
    localStorageService.setTokens({ ...data, role: user.role });
    dispatch(authRequestSuccess({ userId: data.userId, role: user.role }));
    navigate("/");
  } catch (error) {
    const { path, code, message } = error.response.data.error;
    if (code === 400) {
      // const errorMessage = generetaAuthError(message);
      dispatch(authRequestFailed({ [path]: message }));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp = (payload, navigate) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    const { user } = data;

    localStorageService.setTokens({ ...data, role: user.role });
    dispatch(authRequestSuccess({ userId: data.userId, role: user.role }));
    navigate("/");
  } catch (error) {
    const { path, message } = error.response.data.error;
    dispatch(authRequestFailed({ [path]: message }));
  }
};
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;

export const getUserRole = () => (state) => state.auth.auth?.role;
export const getAuthErrors = () => (state) => state.auth.error;
export default authReducer;
