import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { compose,bindActionCreators } from "redux";
import { Button, Alert } from "react-bootstrap";
import { submitAnswer, getQuestions } from "../actions/question.action";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
        btnClick: false,
        answer: "",
        emptyError: false,
        success: false,
        redirect: false,
        wrongError: false
    };
  }
 
  async componentDidMount(){
    let res = await this.isLoggedIn();
    if(!res){
        this.setState({redirect: true});
        return false;
    }else{
        const response =  await this.props.getQuestions();
        if(response.status === 200 && response.data && response.data.success=== true){
        }else{
        }
    }
  }
 
  async isLoggedIn(){
    let currentTime = new Date().getTime();
    let loginTime = this.props.auth.loggedInAt;
    if (!loginTime) return false;
    let diff = (Math.round((parseInt(currentTime) - parseInt(loginTime))/(60*60*1000)));
    if(loginTime && diff > 1){
        return false;
    }else{
        return true;
    }
  }

  async handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if(!this.isLoggedIn()){
        this.setState({redirect: true});
        return false;
    }
    let answer = this.state.answer;
    if(answer === ''){
      this.setState({emptyError: true});
      return false;
    }else if(["yes", "i don't know", "no", "that's fine"].includes(answer.toLowerCase())){
      this.setState({wrongError: true});
      return false;
    }
    this.setState({btnClick: true})
    let question_id = this.props.questions.question_id;
    const response =  await this.props.submitAnswer({question_id: question_id, answer: this.state.answer});
    if(response.status === 200 && response.data && response.data.success === true){
        this.setState({emptyError: false, success: true, answer: "",  btnClick: false})
    }
  }


  handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      btnClick: false
    });
  };
  
  showAnswers = (e) => {
    window.open('/answers', "_blank") 
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
        return <Redirect to="/login" />;
    }
    const name  = this.props.questions.question_name;
    return(
        <div>
            <form  onSubmit={(e) => this.handleClick(e)}>
                {this.state.emptyError && (<Alert
                    variant="danger"
                    dismissible
                    onClose={() => this.setState({ emptyError: false })}
                >
                  Please enter answer
                </Alert>)}
                {this.state.success && (<Alert
                    variant="info"
                    dismissible
                    onClose={() => this.setState({ success: false })}
                >
                  Answer submitted successfully
                </Alert>)}
                {this.state.wrongError && (<Alert
                    variant="danger"
                    dismissible
                    onClose={() => this.setState({ wrongError: false })}
                >
                  Submitted answer is not allowed.
                </Alert>)}
                <div className="answer-link" >
                    <Button onClick={e => this.showAnswers(e)} >Show Answers</Button>
                </div>
                <div className="wrapper">
                    <div id="questionContent">
                    <label className="question-label">{name}</label>
                        <textarea className="fadeIn second textbox"  value={this.state.answer} onChange={this.handleOnChange} name="answer" placeholder="Enter your answer" ></textarea>
                        <Button
                        type="submit"
                        className="fadeIn fourth submit-button"
                        disabled={this.state.btnClick}
                    >Submit</Button>
                    </div>
                </div>
            </form>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { submitAnswer, getQuestions },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer.userSignIn,
    questions: state.questionReducer.question,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Question);