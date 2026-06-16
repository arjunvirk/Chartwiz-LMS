import {
  EVENTS_REQUEST,
  EVENTS_SUCCESS,
  EVENTS_FAIL,
} from "../constants/economicCalendarConstants";

import { API_URL } from "../config/api";

export const getEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: EVENTS_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/economic-events/upcoming`);

    const data = await response.json();

    dispatch({
      type: EVENTS_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: EVENTS_FAIL,
      payload: error.message,
    });
  }
};
