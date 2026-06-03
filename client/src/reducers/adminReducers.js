import {
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_UPDATE_ROLE_REQUEST,
  ADMIN_UPDATE_ROLE_SUCCESS,
  ADMIN_UPDATE_ROLE_FAIL,
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS,
  ADMIN_STATS_FAIL,
  ADMIN_ANALYTICS_REQUEST,
  ADMIN_ANALYTICS_SUCCESS,
  ADMIN_ANALYTICS_FAIL,
} from "../constants/adminConstants";

// ================= USERS =================

export const adminUsersReducer = (
  state = {
    users: [],
  },

  action,
) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return {
        loading: true,

        users: [],
      };

    case ADMIN_USERS_SUCCESS:
      return {
        loading: false,

        users: action.payload,
      };

    case ADMIN_USERS_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= DELETE USER =================

export const adminDeleteUserReducer = (
  state = {},

  action,
) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_DELETE_USER_SUCCESS:
      return {
        loading: false,

        success: true,
      };

    case ADMIN_DELETE_USER_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= UPDATE ROLE =================

export const adminUpdateRoleReducer = (
  state = {},

  action,
) => {
  switch (action.type) {
    case ADMIN_UPDATE_ROLE_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_UPDATE_ROLE_SUCCESS:
      return {
        loading: false,

        success: true,
      };

    case ADMIN_UPDATE_ROLE_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= ADMIN STATS =================

export const adminStatsReducer = (
  state = {
    stats: {},
  },

  action,
) => {
  switch (action.type) {
    case ADMIN_STATS_REQUEST:
      return {
        loading: true,

        stats: {},
      };

    case ADMIN_STATS_SUCCESS:
      return {
        loading: false,

        stats: action.payload,
      };

    case ADMIN_STATS_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};

// ================= ADMIN ANALYTICS =================

export const adminAnalyticsReducer = (
  state = {
    analytics: [],
  },

  action,
) => {
  switch (action.type) {
    case ADMIN_ANALYTICS_REQUEST:
      return {
        loading: true,

        analytics: [],
      };

    case ADMIN_ANALYTICS_SUCCESS:
      return {
        loading: false,

        analytics: action.payload,
      };

    case ADMIN_ANALYTICS_FAIL:
      return {
        loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
};
