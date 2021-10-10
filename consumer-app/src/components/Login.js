import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import { Spinner } from "react-bootstrap";
import { Button, Alert } from "react-bootstrap";

import { connect } from "react-redux";
import { compose,bindActionCreators } from "redux";
import { userSignIn } from "../actions/auth.actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      emptyError: false
    };
  }
 
  async handleClick(event) {
    this.setState({btnLoginClick: true})
    event.preventDefault();
    event.stopPropagation();

    if(this.state.username ==='' || this.state.password === ''){
      this.setState({emptyError: true})
      return false
    }
    const response =  await this.props.userSignIn({email: this.state.username, password: this.state.password});
    if (response && response.data.access_token){
       this.setState({redirect: true})
    }
  }

  handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/question" />;
    }
    return(
      <div className="wrapper fadeInDown">
         {this.state.emptyError && (<Alert
            variant="danger"
            onClose={() => this.setState({ emptyError: false })}
          >
            Please enter username and password
          </Alert>)}
        <div id="formContent">
          <form  onSubmit={(e) => this.handleClick(e)}>
            <input type="text" id="login" className="fadeIn second textbox" name="username" placeholder="login"  onChange={this.handleOnChange}></input>
            <input id="password" className="fadeIn third textbox" name="password" placeholder="password" type="password"  onChange={this.handleOnChange}></input>
            <Button
                    type="submit"
                    className="fadeIn fourth login-button"
                    disabled={this.state.btnLoginClick}
                  >
                    {this.state.btnLoginClick ? (
                      <div>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        <span>Log In...</span>
                      </div>
                    ) : (
                      "Log In"
                    )}
                  </Button>
          </form>
        </div>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { userSignIn },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer.userSignIn,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);