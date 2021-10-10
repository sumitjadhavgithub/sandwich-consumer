import { combineReducers } from "redux";

let initialState = {
  question_id: "",
  question_name: "",
  answers: [],
};

const question = (state = initialState, action) => {
  switch (action.type) {
    
    case "SET_QUESTIONS":
      return {
        ...state,
        question_id: action.question.id,
        question_name: action.question.name
      };
    case "SET_ANSWERS":
      return {
        ...state,
        answers: action.answers
      };
    default:
      return state;
  }
};

export default combineReducers({
  question,
});
