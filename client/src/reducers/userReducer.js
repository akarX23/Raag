import { LOGIN, AUTH, LOGOUT } from "../ACTION_TYPES";

const user = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, user: payload };
    case AUTH:
      return { ...state, user: payload };
    case LOGOUT:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default user;
