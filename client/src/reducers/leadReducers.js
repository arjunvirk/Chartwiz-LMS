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
  LEAD_UPDATE_RESET,
  LEAD_DELETE_REQUEST,
  LEAD_DELETE_SUCCESS,
  LEAD_DELETE_FAIL,
} from "../constants/leadConstants";

// LIST

export const leadListReducer = (state = { leads: [] }, action) => {
  switch (action.type) {
    case LEAD_LIST_REQUEST:
      return { loading: true, leads: [] };

    case LEAD_LIST_SUCCESS:
      return {
        loading: false,
        leads: action.payload,
      };

    case LEAD_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// DETAILS

export const leadDetailsReducer = (state = { lead: {} }, action) => {
  switch (action.type) {
    case LEAD_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LEAD_DETAILS_SUCCESS:
      return {
        loading: false,
        lead: action.payload,
      };

    case LEAD_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// UPDATE

export const leadUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAD_UPDATE_REQUEST:
      return { loading: true };

    case LEAD_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        lead: action.payload,
      };

    case LEAD_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case LEAD_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

// DELETE

export const leadDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAD_DELETE_REQUEST:
      return { loading: true };

    case LEAD_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case LEAD_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
