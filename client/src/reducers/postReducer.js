import { CREATE, CLEARPOSTACTIONS } from "../ACTION_TYPES";

const post = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE:
      return { ...state, postAction: payload };
    case CLEARPOSTACTIONS:
      return { ...state, postAction: null };
    default:
      return state;
  }
};

export default post;
