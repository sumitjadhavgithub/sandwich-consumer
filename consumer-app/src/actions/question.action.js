import axios from "axios";
import { ANSWERS, QUESTIONS } from "../config/urls";


export const submitAnswer = (payload) => {
  return async (dispatch, getState) => {
    let state = getState().authReducer.userSignIn.token;
    let question_id = payload.question_id;
    let answer = payload.answer;
    try {
      const headers =  { "Content-Type": "application/json", "Authorization": `Bearer ${state}`}
      let payload = {
        "question_id": question_id,
        "answer" : answer
    }
      const response = await axios.post(
        `${ANSWERS}`,
        payload,
        {
          headers: headers
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};


export const getQuestions = () => {
  return async (dispatch, getState) => {
    let state = getState().authReducer.userSignIn.token;
    try {
      const headers =  { "Content-Type": "application/json", "Authorization": `Bearer ${state}`}
     
      const response = await axios.get(
        `${QUESTIONS}`,      
        {
          headers: headers
        }
      );
      dispatch({
        type: "SET_QUESTIONS",
        question: response.data.questions[0]
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAnswers = () => {
  return async (dispatch, getState) => {
    let state = getState().authReducer.userSignIn.token;
    let question_id = getState().questionReducer.question.question_id;
    try {
      const headers =  { "Content-Type": "application/json", "Authorization": `Bearer ${state}`}
      const response = await axios.get(
        `${QUESTIONS}/${question_id}/answers`,
        {
          headers: headers
        }
      );
      dispatch({
        type: "SET_ANSWERS",
        answers: response.data.answers
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
