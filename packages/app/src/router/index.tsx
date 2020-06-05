import * as Domain from "@app/domain";
import React from "react";
import * as App from "../App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const AppRouter = () => {
  const reducers = Domain.createReducers();
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App.Container reducers={reducers} />
        </Route>
      </Switch>
    </Router>
  );
};
