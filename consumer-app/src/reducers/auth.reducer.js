import { combineReducers } from "redux";

const userSignIn = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGN_IN":
      return {
        token: action.token,
        userEmail: action.userEmail,
        uuid: action.uuid,
        loggedInAt: new Date().getTime()
      };
    default:
      return state;
  }
};

export default combineReducers({
  userSignIn,
});
