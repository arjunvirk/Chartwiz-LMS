import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  MY_COURSES_REQUEST,
  MY_COURSES_SUCCESS,
  MY_COURSES_FAIL,
  TEACHER_COURSES_REQUEST,
  TEACHER_COURSES_SUCCESS,
  TEACHER_COURSES_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
} from "../constants/courseConstants";

import { API_URL } from "../config/api";

import fetchWithAuth from "../utils/fetchWithAuth";

// ================= GET ALL COURSES (PUBLIC) =================

export const listCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_LIST_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/courses`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data.courses,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload: error.message,
    });
  }
};

// ================= GET COURSE DETAILS (PUBLIC) =================

export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_DETAILS_REQUEST,
    });

    const response = await fetch(`${API_URL}/api/courses/${id}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// ================= GET MY COURSES =================

export const getMyCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_COURSES_REQUEST,
    });

    const data = await fetchWithAuth(
      dispatch,
      `${API_URL}/api/courses/student/my-courses`,
      {
        method: "GET",
      },
    );

    dispatch({
      type: MY_COURSES_SUCCESS,
      payload: data.courses,
    });
  } catch (error) {
    dispatch({
      type: MY_COURSES_FAIL,
      payload: error.message,
    });
  }
};

// ================= ENROLL COURSE =================

export const enrollCourse = (id) => async (dispatch) => {
  try {
    const data = await fetchWithAuth(
      dispatch,
      `${API_URL}/api/courses/${id}/enroll`,
      {
        method: "POST",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
};

// ================= GET TEACHER COURSES =================

export const getTeacherCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_COURSES_REQUEST,
    });

    const data = await fetchWithAuth(
      dispatch,
      `${API_URL}/api/courses/teacher/my-courses`,
    );

    dispatch({
      type: TEACHER_COURSES_SUCCESS,
      payload: data.courses,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_COURSES_FAIL,
      payload: error.message,
    });
  }
};

// ================= CREATE COURSE =================

export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_COURSE_REQUEST,
    });

    const data = await fetchWithAuth(
      dispatch,
      `${API_URL}/api/courses/teacher/create`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(courseData),
      },
    );

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data.course,
    });

    return data;
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload: error.message,
    });

    throw error;
  }
};

// ================= DELETE COURSE =================

export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_COURSE_REQUEST,
    });

    const data = await fetchWithAuth(
      dispatch,
      `${API_URL}/api/courses/teacher/${id}`,
      {
        method: "DELETE",
      },
    );

    dispatch({
      type: DELETE_COURSE_SUCCESS,
    });

    return data;
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload: error.message,
    });

    throw error;
  }
};
