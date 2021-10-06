import React, { Component } from "react";
import { Provider } from "react-redux";
import "./styles/styles.css";
// import "./styles/bootstrap-overwrites.css";
import { withRouter, Switch } from "react-router";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
// import Dashboard from "./components/dashboard/Dashboard";

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
                {/* <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute exact path="/farmer" component={newFarmerMap} />
                <PrivateRoute exact path="/newfarmer" component={farmerMap} /> */}
                {/* <Route component={Error} /> */}
              </Switch>
            </PersistGate>
          </Provider>
        </section>
      </Router>
    );
  }
}

export default App;
