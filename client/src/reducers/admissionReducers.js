import {
  ADMISSION_CREATE_REQUEST,
  ADMISSION_CREATE_SUCCESS,
  ADMISSION_CREATE_FAIL,
  ADMISSION_CREATE_RESET,
  ADMISSION_LIST_REQUEST,
  ADMISSION_LIST_SUCCESS,
  ADMISSION_LIST_FAIL,
  ADMISSION_DETAILS_REQUEST,
  ADMISSION_DETAILS_SUCCESS,
  ADMISSION_DETAILS_FAIL,
  ADMISSION_UPDATE_REQUEST,
  ADMISSION_UPDATE_SUCCESS,
  ADMISSION_UPDATE_FAIL,
  ADMISSION_UPDATE_RESET,
  ADMISSION_DELETE_REQUEST,
  ADMISSION_DELETE_SUCCESS,
  ADMISSION_DELETE_FAIL,
  ADMISSION_APPROVE_REQUEST,
  ADMISSION_APPROVE_SUCCESS,
  ADMISSION_APPROVE_FAIL,
  ADMISSION_APPROVE_RESET,
} from "../constants/admissionConstants";

// ================= CREATE =================

export const admissionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMISSION_CREATE_REQUEST:
      return { loading: true };

    case ADMISSION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        admission: action.payload,
      };

    case ADMISSION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADMISSION_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// ================= LIST =================

export const admissionListReducer = (state = { admissions: [] }, action) => {
  switch (action.type) {
    case ADMISSION_LIST_REQUEST:
      return {
        loading: true,
        admissions: [],
      };

    case ADMISSION_LIST_SUCCESS:
      return {
        loading: false,
        admissions: action.payload,
      };

    case ADMISSION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= DETAILS =================

export const admissionDetailsReducer = (state = { admission: {} }, action) => {
  switch (action.type) {
    case ADMISSION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMISSION_DETAILS_SUCCESS:
      return {
        loading: false,
        admission: action.payload,
      };

    case ADMISSION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= UPDATE =================

export const admissionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMISSION_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case ADMISSION_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        admission: action.payload,
      };

    case ADMISSION_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADMISSION_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const admissionApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMISSION_APPROVE_REQUEST:
      return {
        loading: true,
      };

    case ADMISSION_APPROVE_SUCCESS:
      return {
        loading: false,
        success: true,
        admission: action.payload.admission,
      };

    case ADMISSION_APPROVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADMISSION_APPROVE_RESET:
      return {};

    default:
      return state;
  }
};

// ================= DELETE =================

export const admissionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMISSION_DELETE_REQUEST:
      return {
        loading: true,
      };

    case ADMISSION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ADMISSION_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
