import {
  ANALYSIS_LIST_REQUEST,
  ANALYSIS_LIST_SUCCESS,
  ANALYSIS_LIST_FAIL,
  ANALYSIS_CREATE_REQUEST,
  ANALYSIS_CREATE_SUCCESS,
  ANALYSIS_CREATE_FAIL,
  ANALYSIS_DELETE_FAIL,
  ANALYSIS_DELETE_SUCCESS,
  ANALYSIS_DELETE_REQUEST,
  ANALYSIS_UPDATE_REQUEST,
  ANALYSIS_UPDATE_SUCCESS,
  ANALYSIS_UPDATE_FAIL,
  ANALYSIS_DETAILS_REQUEST,
  ANALYSIS_DETAILS_SUCCESS,
  ANALYSIS_DETAILS_FAIL,
} from "../constants/marketAnalysisConstants";

export const analysisListReducer = (
  state = {
    analyses: [],
  },
  action,
) => {
  switch (action.type) {
    case ANALYSIS_LIST_REQUEST:
      return {
        loading: true,
        analyses: [],
      };

    case ANALYSIS_LIST_SUCCESS:
      return {
        loading: false,
        analyses: action.payload,
      };

    case ANALYSIS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const analysisCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANALYSIS_CREATE_REQUEST:
      return { loading: true };

    case ANALYSIS_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        analysis: action.payload,
      };

    case ANALYSIS_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const analysisDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ANALYSIS_DELETE_REQUEST:
      return { loading: true };

    case ANALYSIS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ANALYSIS_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const analysisUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANALYSIS_UPDATE_REQUEST:
      return { loading: true };

    case ANALYSIS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ANALYSIS_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const analysisDetailsReducer = (state = { analysis: {} }, action) => {
  switch (action.type) {
    case ANALYSIS_DETAILS_REQUEST:
      return { loading: true };

    case ANALYSIS_DETAILS_SUCCESS:
      return {
        loading: false,
        analysis: action.payload,
      };

    case ANALYSIS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
