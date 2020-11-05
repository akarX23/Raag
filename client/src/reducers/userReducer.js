import {
  LOGIN,
  AUTH,
  LOGOUT,
  ADDUSER,
  CLEARADMINACTIONS,
} from "../ACTION_TYPES";

const user = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, user: payload };
    case AUTH:
      return { ...state, user: payload };
    case LOGOUT:
      return { ...state, user: payload };
    case ADDUSER:
      return { ...state, adminAction: payload };
    case CLEARADMINACTIONS:
      return { ...state, adminAction: null };
    default:
      return state;
  }
};

export default user;
