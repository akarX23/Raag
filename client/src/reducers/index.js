import { combineReducers } from "redux";
import user from "./userReducer";

const rootReducers = combineReducers({
  user,
});

export default rootReducers;
