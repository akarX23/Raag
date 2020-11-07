import {
  CREATE,
  CLEARPOSTACTIONS,
  GETPOSTS,
  DELETEPOST,
} from "../ACTION_TYPES";

const post = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE:
      return { ...state, postAction: payload };
    case CLEARPOSTACTIONS:
      return { ...state, postAction: null };
    case GETPOSTS:
      return { ...state, posts: payload };
    case DELETEPOST:
      return {
        ...state,
        posts: { found: true, posts: payload.posts },
        postAction: payload.postAction,
      };
    default:
      return state;
  }
};

export default post;
