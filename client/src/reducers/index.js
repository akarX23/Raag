import { combineReducers } from "redux";
import user from "./userReducer";
import post from "./postReducer";

const rootReducers = combineReducers({
  user,
  post,
});

export default rootReducers;
