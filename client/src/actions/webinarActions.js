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

export const listWebinars = () => async (dispatch) => {
  try {
    dispatch({
      type: WEBINAR_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/webinars`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch webinars");
    }

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

export const createWebinar = (webinar) => async (dispatch) => {
  try {
    dispatch({
      type: WEBINAR_CREATE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/webinars`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(webinar),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create webinar");
    }

    dispatch({
      type: WEBINAR_CREATE_SUCCESS,
      payload: data.webinar,
    });
  } catch (error) {
    dispatch({
      type: WEBINAR_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const deleteWebinar = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WEBINAR_DELETE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/webinars/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete webinar");
    }

    dispatch({
      type: WEBINAR_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WEBINAR_DELETE_FAIL,
      payload: error.message,
    });
  }
};
