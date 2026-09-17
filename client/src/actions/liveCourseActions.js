import fetchWithAuth from "../utils/fetchWithAuth";
import {
  LIVE_COURSE_LIST_REQUEST,
  LIVE_COURSE_LIST_SUCCESS,
  LIVE_COURSE_LIST_FAIL,
  LIVE_COURSE_CREATE_REQUEST,
  LIVE_COURSE_CREATE_SUCCESS,
  LIVE_COURSE_CREATE_FAIL,
  MY_LIVE_COURSES_REQUEST,
  MY_LIVE_COURSES_SUCCESS,
  MY_LIVE_COURSES_FAIL,
  TEACHER_LIVE_COURSES_REQUEST,
  TEACHER_LIVE_COURSES_SUCCESS,
  TEACHER_LIVE_COURSES_FAIL,
  LIVE_COURSE_ENROLL_REQUEST,
  LIVE_COURSE_ENROLL_SUCCESS,
  LIVE_COURSE_ENROLL_FAIL,
  LIVE_COURSE_DELETE_REQUEST,
  LIVE_COURSE_DELETE_SUCCESS,
  LIVE_COURSE_DELETE_FAIL,
} from "../constants/liveCourseConstants";

import { API_URL } from "../config/api";

// ================= GET ALL LIVE COURSES =================

export const getLiveCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: LIVE_COURSE_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/live-courses`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: LIVE_COURSE_LIST_SUCCESS,

      payload: data.liveCourses,
    });
  } catch (error) {
    dispatch({
      type: LIVE_COURSE_LIST_FAIL,

      payload: error.message,
    });
  }
};

// ================= CREATE LIVE COURSE =================

export const createLiveCourse = (courseData) => async (dispatch) => {
  dispatch({ type: LIVE_COURSE_CREATE_REQUEST });
  try {
    const data = await fetchWithAuth(dispatch, `${API_URL}/api/live-courses`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(courseData),
    });
    dispatch({ type: LIVE_COURSE_CREATE_SUCCESS, payload: data.liveCourse });
    return data;
  } catch (error) {
    dispatch({ type: LIVE_COURSE_CREATE_FAIL, payload: error.message });
    throw error;
  }
};
// ================= MY LIVE COURSES =================

export const getMyLiveCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_LIVE_COURSES_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/live-courses/student/my-live-courses`,
      {
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: MY_LIVE_COURSES_SUCCESS,

      payload: data.liveCourses,
    });
  } catch (error) {
    dispatch({
      type: MY_LIVE_COURSES_FAIL,

      payload: error.message,
    });
  }
};

// ================= TEACHER LIVE COURSES =================

export const getTeacherLiveCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_LIVE_COURSES_REQUEST,
    });

    const response = await fetch(
      `${API_URL}/api/live-courses/teacher/my-live-courses`,
      {
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: TEACHER_LIVE_COURSES_SUCCESS,

      payload: data.liveCourses,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_LIVE_COURSES_FAIL,

      payload: error.message,
    });
  }
};

// ================= ENROLL LIVE COURSE =================

export const enrollLiveCourse = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIVE_COURSE_ENROLL_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/live-courses/${id}/enroll`, {
      method: "POST",

      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: LIVE_COURSE_ENROLL_SUCCESS,
    });

    return data;
  } catch (error) {
    dispatch({
      type: LIVE_COURSE_ENROLL_FAIL,

      payload: error.message,
    });

    throw error;
  }
};

// ================= DELETE LIVE COURSE =================

export const deleteLiveCourse = (id) => async (dispatch) => {
  dispatch({ type: LIVE_COURSE_DELETE_REQUEST });
  try {
    const data = await fetchWithAuth(dispatch, `${API_URL}/api/live-courses/${id}`, { method: "DELETE" });
    dispatch({ type: LIVE_COURSE_DELETE_SUCCESS });
    return data;
  } catch (error) {
    dispatch({ type: LIVE_COURSE_DELETE_FAIL, payload: error.message });
    throw error;
  }
};

