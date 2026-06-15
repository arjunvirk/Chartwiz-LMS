import {
  FOREX_NEWS_LIST_REQUEST,
  FOREX_NEWS_LIST_SUCCESS,
  FOREX_NEWS_LIST_FAIL,
  FOREX_NEWS_DETAILS_REQUEST,
  FOREX_NEWS_DETAILS_SUCCESS,
  FOREX_NEWS_DETAILS_FAIL,
} from "../constants/forexNewsConstants";

// LIST

export const forexNewsReducer = (
  state = {
    news: [],
  },
  action,
) => {
  switch (action.type) {
    case FOREX_NEWS_LIST_REQUEST:
      return {
        loading: true,
        news: [],
      };

    case FOREX_NEWS_LIST_SUCCESS:
      return {
        loading: false,
        news: action.payload,
      };

    case FOREX_NEWS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      
    default:
      return state;
  }
};

// DETAILS

export const forexNewsDetailsReducer = (
  state = {
    news: {},
  },
  action,
) => {
  switch (action.type) {
    case FOREX_NEWS_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case FOREX_NEWS_DETAILS_SUCCESS:
      return {
        loading: false,
        news: action.payload,
      };

    case FOREX_NEWS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
