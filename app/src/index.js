
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Authentication from "./views/Authentication";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      {/* <Redirect from="/" to="/auth" /> */}
      <Route exact path="/auth" render={() => (<Authentication />)} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
