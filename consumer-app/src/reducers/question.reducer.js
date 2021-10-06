import { combineReducers } from "redux";

// const initialState = {
//   isLoading: false,
//   isSuccess: null,
//   isLoggedIn: false,
//   isError: false,
//   errors: null,
//   token: null,
// };

const userSignIn = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNING_IN":
      return {
        isLoading: true,
        token: null,
        isError: false,
        isSuccess: false,
        errors: null,
        isLoggedIn: false,
        userEmail: null,
        sessionLogout: false,
        userDetails: null
      };
    case "USER_SIGN_IN":
      return {
        isLoading: false,
        token: action.token,
        isError: false,
        isSuccess: true,
        errors: null,
        isLoggedIn: true,
        userEmail: action.userEmail,
        sessionLogout: false,
        userDetails: null
      };

    case "USER_SIGN_IN_FAIL":
      return {
        isLoading: false,
        token: null,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        isLoggedIn: false,
        userEmail: null,
        sessionLogout: false,
        userDetails: null
      };
    case "USER_SIGN_OUT":
      return {
        isLoading: false,
        token: null,
        isError: false,
        isSuccess: false,
        errors: null,
        isLoggedIn: false,
        userEmail: null,
        sessionLogout: false,
        userDetails: null
      };
    case "USER_SESSION_TIME_OUT":
      return {
        isLoading: false,
        token: null,
        isError: false,
        isSuccess: false,
        errors: null,
        isLoggedIn: false,
        userEmail: null,
        sessionLogout: true,
        userDetails: null
      };
    case "USER_SIGN_OUT_FAIL":
      return {
        isLoading: false,
        token: null,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        isLoggedIn: false,
        userEmail: null,
        sessionLogout: false,
        userDetails: null
      };
    case "USER_DETAILS_SET":
      return {    
        isLoading: false,
        token: action.token,
        isError: false,
        isSuccess: true,
        errors: null,
        isLoggedIn: true,
        userEmail: action.userEmail,
        sessionLogout: false,
        userDetails: action.userDetails
      };
    case "SET_TOKEN":
      return Object.assign({}, state, {
        token: action.token
      })
    default:
      return state;
  }
};

export default combineReducers({
  userSignIn,
});
