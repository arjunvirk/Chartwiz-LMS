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

// ================= LIVE COURSE LIST =================

export const liveCourseListReducer = (
  state = {
    liveCourses: [],
  },
  action,
) => {
  switch (action.type) {
    case LIVE_COURSE_LIST_REQUEST:
      return {
        loading: true,

        liveCourses: [],
      };

    case LIVE_COURSE_LIST_SUCCESS:
      return {
        loading: false,

        liveCourses: action.payload,
      };

    case LIVE_COURSE_LIST_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= CREATE LIVE COURSE =================

export const liveCourseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LIVE_COURSE_CREATE_REQUEST:
      return {
        loading: true,
      };

    case LIVE_COURSE_CREATE_SUCCESS:
      return {
        loading: false,

        success: true,

        liveCourse: action.payload,
      };

    case LIVE_COURSE_CREATE_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= MY LIVE COURSES =================

export const myLiveCoursesReducer = (
  state = {
    liveCourses: [],
  },
  action,
) => {
  switch (action.type) {
    case MY_LIVE_COURSES_REQUEST:
      return {
        loading: true,

        liveCourses: [],
      };

    case MY_LIVE_COURSES_SUCCESS:
      return {
        loading: false,

        liveCourses: action.payload,
      };

    case MY_LIVE_COURSES_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= TEACHER LIVE COURSES =================

export const teacherLiveCoursesReducer = (
  state = {
    liveCourses: [],
  },
  action,
) => {
  switch (action.type) {
    case TEACHER_LIVE_COURSES_REQUEST:
      return {
        loading: true,

        liveCourses: [],
      };

    case TEACHER_LIVE_COURSES_SUCCESS:
      return {
        loading: false,

        liveCourses: action.payload,
      };

    case TEACHER_LIVE_COURSES_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= ENROLL LIVE COURSE =================

export const liveCourseEnrollReducer = (state = {}, action) => {
  switch (action.type) {
    case LIVE_COURSE_ENROLL_REQUEST:
      return {
        loading: true,
      };

    case LIVE_COURSE_ENROLL_SUCCESS:
      return {
        loading: false,

        success: true,
      };

    case LIVE_COURSE_ENROLL_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= DELETE LIVE COURSE =================

export const liveCourseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LIVE_COURSE_DELETE_REQUEST:
      return {
        loading: true,
      };

    case LIVE_COURSE_DELETE_SUCCESS:
      return {
        loading: false,

        success: true,
      };

    case LIVE_COURSE_DELETE_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};
