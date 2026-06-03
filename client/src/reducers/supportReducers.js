import {
  SUPPORT_CREATE_REQUEST,
  SUPPORT_CREATE_SUCCESS,
  SUPPORT_CREATE_FAIL,
  SUPPORT_CREATE_RESET,
} from "../constants/supportConstants";

export const supportCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_CREATE_REQUEST:
      return {
        loading: true,
      };

    case SUPPORT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        support: action.payload,
      };

    case SUPPORT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case SUPPORT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
