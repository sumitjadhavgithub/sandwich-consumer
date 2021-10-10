import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { compose,bindActionCreators } from "redux";
import { Alert } from "react-bootstrap";
import { getAnswers } from "../actions/question.action";
import { MDBDataTable } from "mdbreact";
import Pusher from 'pusher-js';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
        btnClick: false,
        answer: "",
        emptyError: false,
        success: false,
        redirect: false,
        data: {columns: [
            {
              label: '',
              field: 'answer',
            } 
          ],
          rows: [
            {
                answer: '',
            }
          ]}
    };
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

  async componentDidMount(){
    let res = await this.isLoggedIn();
    if(!res){
      this.setState({redirect: true});
      return false;
    }else{
      this.subscribePusher();
      this.getAnswers();
    }
  }

  subscribePusher(){
    let pusher = new Pusher('eacf26f0bc3a1caf0647', { cluster: 'ap2' });
    let uuid = this.props.auth.uuid;
    const id = `${uuid}_user`;
    const params = {
        id,
        events: {
            'answer_added': () => {
                this.getAnswers();
            }
        }
    }
    Object.keys(params.events).map((eventName) => pusher.subscribe(id).bind(eventName, params.events[eventName]));
  }

  async getAnswers() {
    const response =  await this.props.getAnswers();
    if(response.status === 200 && response.data && response.data.success === true){
        let rows = []
        for (let i = 0; i < this.props.questions.answers.length; i++) {
            rows.push({answer: this.props.questions.answers[i].answer, create_at:  this.props.questions.answers[i].created_at})
        }
        let data = {
            columns: [{
              label: '',
              field: 'answer',
              width: 400,
            },
            {
              label: '',
              field: 'create_at',
              width: 150,
            }
            ],
            rows:rows.reverse()
        }
        this.setState({data: data});
    }else{
    }
  }
 
  async handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if(this.state.answer === ''){
      this.setState({emptyError: true})
      return false
    }
    this.setState({btnClick: true})
    let question_id = this.props.questions.question_id;
    const response =  await this.props.submitAnswer({question_id: question_id, answer: this.state.answer});
    if(response.status === 200 && response.data && response.data.success === true){
        this.setState({emptyError: false, success: true, answer: "",  btnClick: false})
    }
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
                <div className="wrapper">
                    <label className="answer-label">Answers</label>
                    <div id="questionContent">
                    <MDBDataTable
                      striped
                      bordered
                      hover
                      data={this.state.data}
                        searching={false}
                        entries={10}
                        />
                    </div>
                </div>
            </form>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getAnswers },
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
)(Answers);