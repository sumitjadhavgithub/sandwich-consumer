import React, { Component } from "react";
import { Redirect } from "react-router";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (<Redirect to="/login" />);
   
    
  }
}
export default Error;