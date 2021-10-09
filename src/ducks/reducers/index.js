import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
});

export default rootReducer;
