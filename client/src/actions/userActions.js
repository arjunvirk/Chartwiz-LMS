import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

import { API_URL } from "../config/api";

// ---------------- LOGIN USER ----------------

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/users/login`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: USER_LOGIN_SUCCESS,

      payload: data,
    });

    localStorage.setItem(
      "userInfo",

      JSON.stringify(data),
    );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,

      payload: error.message,
    });
  }
};

// ---------------- REGISTER USER ----------------

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/users/register`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: USER_REGISTER_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,

      payload: error.message,
    });
  }
};

// ---------------- GET USER DETAILS ----------------

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/users/me`,

      {
        method: "GET",

        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: USER_DETAILS_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,

      payload: error.message,
    });
  }
};

// ---------------- UPDATE USER PROFILE ----------------

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/users/profile`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(userData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,

      payload: data,
    });

    // UPDATE LOGIN STATE

    dispatch({
      type: USER_LOGIN_SUCCESS,

      payload: data,
    });

    // UPDATE LOCAL STORAGE

    localStorage.setItem(
      "userInfo",

      JSON.stringify(data),
    );
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,

      payload: error.message,
    });
  }
};

// ---------------- LOGOUT USER ----------------

export const logout = () => {
  return async (dispatch) => {
    try {
      await fetch(`${API_URL}/api/users/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("userInfo");

    dispatch({
      type: USER_LOGOUT,
    });
  };
};
