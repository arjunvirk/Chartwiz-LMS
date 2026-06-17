import {
  RAZORPAY_ORDER_REQUEST,
  RAZORPAY_ORDER_SUCCESS,
  RAZORPAY_ORDER_FAIL,
} from "../constants/razorpayConstants";

import { API_URL } from "../config/api";

export const createRazorpayOrder = (amount) => async (dispatch) => {
  try {
    dispatch({
      type: RAZORPAY_ORDER_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/razorpay/create-order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create order");
    }

    dispatch({
      type: RAZORPAY_ORDER_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: RAZORPAY_ORDER_FAIL,
      payload: error.message,
    });
  }
};
