import { configureStore } from "@reduxjs/toolkit";

import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

import {
  courseListReducer,
  courseDetailsReducer,
  myCoursesReducer,
  teacherCoursesReducer,
  createCourseReducer,
  deleteCourseReducer,
} from "./reducers/courseReducers";

import {
  adminUsersReducer,
  adminDeleteUserReducer,
  adminUpdateRoleReducer,
  adminStatsReducer,
  adminAnalyticsReducer,
} from "./reducers/adminReducers";

import {
  liveCourseListReducer,
  liveCourseCreateReducer,
  myLiveCoursesReducer,
  teacherLiveCoursesReducer,
  liveCourseEnrollReducer,
  liveCourseDeleteReducer,
} from "./reducers/liveCourseReducers";

import { supportCreateReducer } from "./reducers/supportReducers";

import {
  webinarListReducer,
  webinarCreateReducer,
  webinarDeleteReducer,
} from "./reducers/webinarReducers";

import {
  analysisListReducer,
  analysisCreateReducer,
  analysisDeleteReducer,
  analysisUpdateReducer,
} from "./reducers/marketAnalysisReducers";

import {
  forexNewsReducer,
  forexNewsDetailsReducer,
} from "./reducers/forexNewsReducers";

import { economicEventsReducer } from "./reducers/economicCalendarReducers";

// USER INFO FROM LOCAL STORAGE

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// INITIAL STATE

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

// STORE

const store = configureStore({
  reducer: {
    // Authentication
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userVerify: userVerifyReducer,
    userUpdateProfile: userUpdateProfileReducer,

    // Course
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
    myCourses: myCoursesReducer,
    teacherCourses: teacherCoursesReducer,
    createCourse: createCourseReducer,
    deleteCourse: deleteCourseReducer,

    adminUsers: adminUsersReducer,
    adminDeleteUser: adminDeleteUserReducer,
    adminUpdateRole: adminUpdateRoleReducer,
    adminStats: adminStatsReducer,
    adminAnalytics: adminAnalyticsReducer,

    liveCourseList: liveCourseListReducer,
    liveCourseCreate: liveCourseCreateReducer,
    myLiveCourses: myLiveCoursesReducer,
    teacherLiveCourses: teacherLiveCoursesReducer,
    liveCourseEnroll: liveCourseEnrollReducer,
    liveCourseDelete: liveCourseDeleteReducer,

    supportCreate: supportCreateReducer,

    webinarList: webinarListReducer,
    webinarCreate: webinarCreateReducer,
    webinarDelete: webinarDeleteReducer,

    analysisList: analysisListReducer,
    analysisCreate: analysisCreateReducer,
    analysisDelete: analysisDeleteReducer,
    analysisUpdate: analysisUpdateReducer,

    forexNews: forexNewsReducer,
    forexNewsDetails: forexNewsDetailsReducer,

    economicEvents: economicEventsReducer,
  },

  preloadedState: initialState,
});

export default store;
