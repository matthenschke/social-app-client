import {
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_USER,
  LOADING_USER,
} from "../types";
import axios from "axios";

const setAuthorizationHeader = (token) => {
  const fbToken = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = fbToken;
  localStorage.setItem("FBIdToken", fbToken);
};
export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const {
      data: { token },
    } = await axios.post("/login", userData);
    setAuthorizationHeader(token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/"); // push url (redirect)
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    console.log(err);
  }
};

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const {
      data: { token },
    } = await axios.post("/signup", newUserData);

    setAuthorizationHeader(token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    console.log(err);
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  if (axios.defaults.common) delete axios.defaults.common;
  dispatch({ type: SET_UNAUTHENTICATED });
};
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const { data } = await axios.get("/user");
    dispatch({ type: SET_USER, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const uploadImage = (formData) => async (dispatch) => {
  // dispatch({ type: LOADING_USER });
  try {
    const res = await axios.post("/user/image", formData);
    console.log(res);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};
