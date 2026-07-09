import {
  ADMISSION_CREATE_REQUEST,
  ADMISSION_CREATE_SUCCESS,
  ADMISSION_CREATE_FAIL,
  ADMISSION_LIST_REQUEST,
  ADMISSION_LIST_SUCCESS,
  ADMISSION_LIST_FAIL,
  ADMISSION_DETAILS_REQUEST,
  ADMISSION_DETAILS_SUCCESS,
  ADMISSION_DETAILS_FAIL,
  ADMISSION_UPDATE_REQUEST,
  ADMISSION_UPDATE_SUCCESS,
  ADMISSION_UPDATE_FAIL,
  ADMISSION_DELETE_REQUEST,
  ADMISSION_DELETE_SUCCESS,
  ADMISSION_DELETE_FAIL,
  ADMISSION_APPROVE_REQUEST,
  ADMISSION_APPROVE_SUCCESS,
  ADMISSION_APPROVE_FAIL,
} from "../constants/admissionConstants";

import { API_URL } from "../config/api";

// ================= CREATE =================

export const createAdmission = (admissionData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMISSION_CREATE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/admissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admissionData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit admission");
    }

    dispatch({
      type: ADMISSION_CREATE_SUCCESS,
      payload: data.admission,
    });
  } catch (error) {
    dispatch({
      type: ADMISSION_CREATE_FAIL,
      payload: error.message,
    });
  }
};

// ================= GET ALL =================

export const getAdmissions = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMISSION_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/admissions`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admissions");
    }

    dispatch({
      type: ADMISSION_LIST_SUCCESS,
      payload: data.admissions,
    });
  } catch (error) {
    dispatch({
      type: ADMISSION_LIST_FAIL,
      payload: error.message,
    });
  }
};

// ================= GET SINGLE =================

export const getAdmissionDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMISSION_DETAILS_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/admissions/${id}`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admission");
    }

    dispatch({
      type: ADMISSION_DETAILS_SUCCESS,
      payload: data.admission,
    });
  } catch (error) {
    dispatch({
      type: ADMISSION_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateAdmission = (id, admissionData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMISSION_UPDATE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/admissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(admissionData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update admission");
    }

    dispatch({
      type: ADMISSION_UPDATE_SUCCESS,
      payload: data.admission,
    });
  } catch (error) {
    dispatch({
      type: ADMISSION_UPDATE_FAIL,
      payload: error.message,
    });
  }
};

export const approveAdmission = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMISSION_APPROVE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/admissions/${id}/approve`, {
      method: "PUT",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to approve admission");
    }

    dispatch({
      type: ADMISSION_APPROVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMISSION_APPROVE_FAIL,
      payload: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteAdmission = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMISSION_DELETE_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/admissions/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete admission");
    }

    dispatch({
      type: ADMISSION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMISSION_DELETE_FAIL,
      payload: error.message,
    });
  }
};
