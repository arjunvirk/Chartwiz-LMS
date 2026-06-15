import {
  EVENTS_REQUEST,
  EVENTS_SUCCESS,
  EVENTS_FAIL,
} from "../constants/economicCalendarConstants";

export const economicEventsReducer = (
  state = {
    events: [],
  },
  action,
) => {
  switch (action.type) {
    case EVENTS_REQUEST:
      return {
        loading: true,
        events: [],
      };

    case EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload,
      };

    case EVENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
