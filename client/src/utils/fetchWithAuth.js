import { USER_LOGOUT } from "../constants/userConstants";

const fetchWithAuth = async (dispatch, url, options = {}) => {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  // ================= SESSION EXPIRED =================

  if (response.status === 401) {
    localStorage.removeItem("userInfo");

    dispatch({
      type: USER_LOGOUT,
    });

    throw new Error(data?.message || "Session expired. Please login again.");
  }

  // ================= OTHER ERRORS =================

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong.");
  }

  return data;
};

export default fetchWithAuth;
