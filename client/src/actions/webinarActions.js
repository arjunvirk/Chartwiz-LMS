import {
  WEBINAR_LIST_REQUEST,
  WEBINAR_LIST_SUCCESS,
  WEBINAR_LIST_FAIL,
  WEBINAR_CREATE_REQUEST,
  WEBINAR_CREATE_SUCCESS,
  WEBINAR_CREATE_FAIL,
  WEBINAR_DELETE_REQUEST,
  WEBINAR_DELETE_SUCCESS,
  WEBINAR_DELETE_FAIL,
} from "../constants/webinarConstants";

import { API_URL } from "../config/api";

import fetchWithAuth from "../utils/fetchWithAuth";

// ================= GET WEBINARS =================

export const listWebinars = () => async (dispatch) => {
  try {
    dispatch({
      type: WEBINAR_LIST_REQUEST,
    });

    const data = await fetchWithAuth(dispatch, `${API_URL}/api/webinars`);

    dispatch({
      type: WEBINAR_LIST_SUCCESS,
      payload: data.webinars,
    });
  } catch (error) {
    dispatch({
      type: WEBINAR_LIST_FAIL,
      payload: error.message,
    });
  }
};

// ================= CREATE WEBINAR =================

export const createWebinar = (webinar) => async (dispatch) => {
  try {
    dispatch({
      type: WEBINAR_CREATE_REQUEST,
    });

    const data = await fetchWithAuth(dispatch, `${API_URL}/api/webinars`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(webinar),
    });

    dispatch({
      type: WEBINAR_CREATE_SUCCESS,
      payload: data.webinar,
    });

    return data;
  } catch (error) {
    dispatch({
      type: WEBINAR_CREATE_FAIL,
      payload: error.message,
    });

    throw error;
  }
};

// ================= DELETE WEBINAR =================

export const deleteWebinar = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WEBINAR_DELETE_REQUEST,
    });

    await fetchWithAuth(dispatch, `${API_URL}/api/webinars/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: WEBINAR_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WEBINAR_DELETE_FAIL,
      payload: error.message,
    });

    throw error;
  }
};
