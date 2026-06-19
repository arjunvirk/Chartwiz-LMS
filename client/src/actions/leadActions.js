import {
  LEAD_LIST_REQUEST,
  LEAD_LIST_SUCCESS,
  LEAD_LIST_FAIL,
  LEAD_DETAILS_REQUEST,
  LEAD_DETAILS_SUCCESS,
  LEAD_DETAILS_FAIL,
  LEAD_UPDATE_REQUEST,
  LEAD_UPDATE_SUCCESS,
  LEAD_UPDATE_FAIL,
  LEAD_DELETE_REQUEST,
  LEAD_DELETE_SUCCESS,
  LEAD_DELETE_FAIL,
} from "../constants/leadConstants";

import { API_URL } from "../config/api";

// GET ALL LEADS

export const getLeads = () => async (dispatch) => {
  try {
    dispatch({ type: LEAD_LIST_REQUEST });

    const response = await fetch(`${API_URL}/api/leads`);
    const data = await response.json();

    dispatch({
      type: LEAD_LIST_SUCCESS,
      payload: data.leads,
    });
  } catch (error) {
    dispatch({
      type: LEAD_LIST_FAIL,
      payload: error.message,
    });
  }
};

// GET SINGLE LEAD

export const getLeadDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LEAD_DETAILS_REQUEST });

    const response = await fetch(`${API_URL}/api/leads/${id}`);
    const data = await response.json();

    dispatch({
      type: LEAD_DETAILS_SUCCESS,
      payload: data.lead,
    });
  } catch (error) {
    dispatch({
      type: LEAD_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// UPDATE LEAD

export const updateLead = (id, leadData) => async (dispatch) => {
  try {
    dispatch({ type: LEAD_UPDATE_REQUEST });

    const response = await fetch(`${API_URL}/api/leads/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(leadData),
    });

    const data = await response.json();

    dispatch({
      type: LEAD_UPDATE_SUCCESS,
      payload: data.lead,
    });
  } catch (error) {
    dispatch({
      type: LEAD_UPDATE_FAIL,
      payload: error.message,
    });
  }
};

// DELETE LEAD

export const deleteLead = (id) => async (dispatch) => {
  try {
    dispatch({ type: LEAD_DELETE_REQUEST });

    await fetch(`${API_URL}/api/leads/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: LEAD_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LEAD_DELETE_FAIL,
      payload: error.message,
    });
  }
};
