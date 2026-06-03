import {
  SUPPORT_CREATE_REQUEST,
  SUPPORT_CREATE_SUCCESS,
  SUPPORT_CREATE_FAIL,
} from "../constants/supportConstants";

export const createSupportRequest = (supportData) => async (dispatch) => {
  try {
    dispatch({
      type: SUPPORT_CREATE_REQUEST,
    });

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/support/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supportData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit support request");
    }

    dispatch({
      type: SUPPORT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUPPORT_CREATE_FAIL,
      payload: error.message,
    });
  }
};
