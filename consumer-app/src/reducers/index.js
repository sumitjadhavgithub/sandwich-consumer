import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth.reducer.js";
import questionReducer from "./question.reducer.js";

const reducers = {
  authReducer,
  questionReducer,
  form: formReducer,
};

export default combineReducers(reducers);
