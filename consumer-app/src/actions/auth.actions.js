import axios from "axios";
import { SIGNIN, USER } from "../config/urls";


export const userSignIn = (payload) => {
  return async (dispatch) => {
    let userEmail = payload.email;
    let password = payload.password;
    try {
      let headers =  { "Content-Type": "application/json"}
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
      headers =  { "Content-Type": "application/json", "Authorization": `Bearer ${response.data.access_token}`}
      const user_response = await axios.get(
        `${USER}`,
        {
          headers: headers
        }
      );
      dispatch({
        type: "USER_SIGN_IN",
        token: response.data.access_token,
        userEmail: payload.email,
        uuid: user_response.data.user.uuid
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
