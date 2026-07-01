import {
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_UPDATE_ROLE_REQUEST,
  ADMIN_UPDATE_ROLE_SUCCESS,
  ADMIN_UPDATE_ROLE_FAIL,
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS,
  ADMIN_STATS_FAIL,
  ADMIN_ANALYTICS_REQUEST,
  ADMIN_ANALYTICS_SUCCESS,
  ADMIN_ANALYTICS_FAIL,
} from "../constants/adminConstants";

import { API_URL } from "../config/api";

import fetchWithAuth from "../utils/fetchWithAuth";

// ================= GET ALL USERS =================

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USERS_REQUEST,
    });

    const data = await fetchWithAuth(dispatch, `${API_URL}/api/admin/users`);

    dispatch({
      type: ADMIN_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USERS_FAIL,
      payload: error.message,
    });
  }
};

// ================= DELETE USER =================

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_USER_REQUEST,
    });

    await fetchWithAuth(dispatch, `${API_URL}/api/admin/users/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: ADMIN_DELETE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload: error.message,
    });
  }
};

// ================= UPDATE USER ROLE =================

export const updateUserRole = (id, role) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_ROLE_REQUEST,
    });

    const data = await fetchWithAuth(
      dispatch,
      `${API_URL}/api/admin/users/${id}/role`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          role,
        }),
      },
    );

    dispatch({
      type: ADMIN_UPDATE_ROLE_SUCCESS,
    });

    return data;
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_ROLE_FAIL,
      payload: error.message,
    });
  }
};

// ================= ADMIN STATS =================

export const getAdminStats = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_STATS_REQUEST,
    });

    const data = await fetchWithAuth(dispatch, `${API_URL}/api/admin/stats`);

    dispatch({
      type: ADMIN_STATS_SUCCESS,
      payload: data.stats,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STATS_FAIL,
      payload: error.message,
    });
  }
};

// ================= ADMIN ANALYTICS =================

export const getAdminAnalytics = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_ANALYTICS_REQUEST,
    });

    const data = await fetchWithAuth(
      dispatch,
      `${API_URL}/api/admin/analytics`,
    );

    dispatch({
      type: ADMIN_ANALYTICS_SUCCESS,
      payload: data.analytics,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ANALYTICS_FAIL,
      payload: error.message,
    });
  }
};

import {
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_CREATE_USER_FAIL,
} from "../constants/adminConstants";

// ================= CREATE USER =================

export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_CREATE_USER_REQUEST,
    });

    const data = await fetchWithAuth(dispatch, `${API_URL}/api/admin/users`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });

    dispatch({
      type: ADMIN_CREATE_USER_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_USER_FAIL,
      payload: error.message,
    });

    throw error;
  }
};
