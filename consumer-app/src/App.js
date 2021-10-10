import React, { Component } from "react";
import { Provider } from "react-redux";
import "./styles/styles.css";
import { withRouter, Switch } from "react-router";
import Login from "./components/Login";
import Question from "./components/Question";
import Answers from "./components/Answers";
import Error from "./components/Error";

import { BrowserRouter as Router, Route } from "react-router-dom";

import persist from "./config/store";
import { PersistGate } from "redux-persist/integration/react";
const persistStore = persist();

class App extends Component {
  render() {
    return (
      <Router>
        <section>
          <Provider store={persistStore.store}>
            <PersistGate loading={null} persistor={persistStore.persistor}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/question" component={Question} />
                <Route exact path="/answers" component={Answers} />
                <Route component={Error} />
              </Switch>
            </PersistGate>
          </Provider>
        </section>
      </Router>
    );
  }
}

export default App;
