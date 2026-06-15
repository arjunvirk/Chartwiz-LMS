import {
  ANALYSIS_LIST_REQUEST,
  ANALYSIS_LIST_SUCCESS,
  ANALYSIS_LIST_FAIL,
  ANALYSIS_CREATE_REQUEST,
  ANALYSIS_CREATE_SUCCESS,
  ANALYSIS_CREATE_FAIL,
  ANALYSIS_DELETE_REQUEST,
  ANALYSIS_DELETE_SUCCESS,
  ANALYSIS_DELETE_FAIL,
  ANALYSIS_UPDATE_REQUEST,
  ANALYSIS_UPDATE_SUCCESS,
  ANALYSIS_UPDATE_FAIL,
} from "../constants/marketAnalysisConstants";

export const getAnalyses = () => async (dispatch) => {
  try {
    dispatch({
      type: ANALYSIS_LIST_REQUEST,
    });

    const response = await fetch("http://localhost:5000/api/analysis", {
      credentials: "include",
    });

    const data = await response.json();

    dispatch({
      type: ANALYSIS_LIST_SUCCESS,
      payload: data.analyses,
    });
  } catch (error) {
    dispatch({
      type: ANALYSIS_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const createAnalysis = (analysisData) => async (dispatch) => {
  try {
    dispatch({
      type: ANALYSIS_CREATE_REQUEST,
    });

    const response = await fetch("http://localhost:5000/api/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(analysisData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create analysis");
    }

    dispatch({
      type: ANALYSIS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANALYSIS_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const deleteAnalysis = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ANALYSIS_DELETE_REQUEST,
    });

    const response = await fetch(`http://localhost:5000/api/analysis/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: ANALYSIS_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ANALYSIS_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export const updateAnalysis = (id, analysisData) => async (dispatch) => {
  try {
    dispatch({
      type: ANALYSIS_UPDATE_REQUEST,
    });

    const response = await fetch(`http://localhost:5000/api/analysis/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(analysisData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: ANALYSIS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANALYSIS_UPDATE_FAIL,
      payload: error.message,
    });
  }
};
