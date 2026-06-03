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

// ---------------- COURSE LIST ----------------

export const courseListReducer = (
  state = {
    courses: [],
  },

  action,
) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return {
        loading: true,

        courses: [],
      };

    case COURSE_LIST_SUCCESS:
      return {
        loading: false,

        courses: action.payload,
      };

    case COURSE_LIST_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ---------------- COURSE DETAILS ----------------

export const courseDetailsReducer = (
  state = {
    course: {},
  },

  action,
) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,

        course: action.payload,
      };

    case COURSE_DETAILS_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ---------------- MY COURSES ----------------

export const myCoursesReducer = (
  state = {
    courses: [],
  },

  action,
) => {
  switch (action.type) {
    case MY_COURSES_REQUEST:
      return {
        loading: true,

        courses: [],
      };

    case MY_COURSES_SUCCESS:
      return {
        loading: false,

        courses: action.payload,
      };

    case MY_COURSES_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= TEACHER COURSES =================

export const teacherCoursesReducer = (
  state = {
    courses: [],
  },

  action,
) => {
  switch (action.type) {
    case TEACHER_COURSES_REQUEST:
      return {
        loading: true,

        courses: [],
      };

    case TEACHER_COURSES_SUCCESS:
      return {
        loading: false,

        courses: action.payload,
      };

    case TEACHER_COURSES_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= CREATE COURSE =================

export const createCourseReducer = (
  state = {},

  action,
) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return {
        loading: true,
      };

    case CREATE_COURSE_SUCCESS:
      return {
        loading: false,

        success: true,

        course: action.payload,
      };

    case CREATE_COURSE_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= DELETE COURSE =================

export const deleteCourseReducer = (
  state = {},

  action,
) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_COURSE_SUCCESS:
      return {
        loading: false,

        success: true,
      };

    case DELETE_COURSE_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};
