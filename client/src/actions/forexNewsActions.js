import {
  FOREX_NEWS_LIST_REQUEST,
  FOREX_NEWS_LIST_SUCCESS,
  FOREX_NEWS_LIST_FAIL,
  FOREX_NEWS_DETAILS_REQUEST,
  FOREX_NEWS_DETAILS_SUCCESS,
  FOREX_NEWS_DETAILS_FAIL,
} from "../constants/forexNewsConstants";

// GET ALL NEWS

export const getForexNews = () => async (dispatch) => {
  try {
    dispatch({
      type: FOREX_NEWS_LIST_REQUEST,
    });

    const response = await fetch("http://localhost:5000/api/forex-news");

    const data = await response.json();

    dispatch({
      type: FOREX_NEWS_LIST_SUCCESS,
      payload: data.news,
    });
  } catch (error) {
    dispatch({
      type: FOREX_NEWS_LIST_FAIL,
      payload: error.message,
    });
  }
};

// GET SINGLE NEWS

export const getForexNewsDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FOREX_NEWS_DETAILS_REQUEST,
    });

    const response = await fetch(`http://localhost:5000/api/forex-news/${id}`);

    const data = await response.json();

    dispatch({
      type: FOREX_NEWS_DETAILS_SUCCESS,
      payload: data.news,
    });
  } catch (error) {
    dispatch({
      type: FOREX_NEWS_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
