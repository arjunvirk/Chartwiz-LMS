import {
  WEBINAR_LIST_REQUEST,
  WEBINAR_LIST_SUCCESS,
  WEBINAR_LIST_FAIL,
  WEBINAR_CREATE_REQUEST,
  WEBINAR_CREATE_SUCCESS,
  WEBINAR_CREATE_FAIL,
} from "../constants/webinarConstants";

export const webinarListReducer = (state = { webinars: [] }, action) => {
  switch (action.type) {
    case WEBINAR_LIST_REQUEST:
      return {
        loading: true,
        webinars: [],
      };

    case WEBINAR_LIST_SUCCESS:
      return {
        loading: false,
        webinars: action.payload,
      };

    case WEBINAR_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const webinarCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WEBINAR_CREATE_REQUEST:
      return { loading: true };

    case WEBINAR_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        webinar: action.payload,
      };

    case WEBINAR_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
