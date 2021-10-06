import axios from "axios";
import { SIGNIN } from "../config/urls";


export const userSignIn = (payload) => {
  return async (dispatch) => {
    let userEmail = payload.email;
    let password = payload.password;
    try {
      try {
        const headers =  { "Content-Type": "application/json"}
        let payload ={
          "grant_type": "password",
          "email": userEmail,
          "password": password,
          "client_id": "TQXWDJYJZUELOTSGILGBKUAQQLNEIKDJDJIZ"
        }
        const response = await axios.post(
          `${SIGNIN}`,
          payload,
          {
            headers: headers
          }
        );
        dispatch({
          type: "USER_SIGN_IN",
          token: response.data.access_token,
          userEmail: payload.email,
        });
        return response;
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      
    }
  };
};
