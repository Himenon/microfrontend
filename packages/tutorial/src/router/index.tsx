import * as Domain from "@app/domain";
import React from "react";
import * as App from "../App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, BaseStyles, Heading } from "@primer/components";
import { classNames } from "@app/style";

export const AppRouter = () => {
  const reducers = Domain.createReducers();
  return (
    <Router>
      <Box className={classNames("border d-flex flex-column flex-md-row")}>
        <Box className={classNames("p-6")}>
          <nav>
            <ul>
              <li>
                <Link to="/" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link to="/users" href="/users">
                  Users
                </Link>
              </li>
            </ul>
          </nav>
        </Box>
        <Box className={classNames("p-5 border flex-auto")}>
          <Switch>
            <Route path="/about">
              <BaseStyles>
                <Heading mb={2}>About</Heading>
              </BaseStyles>
            </Route>
            <Route path="/users">
              <BaseStyles>
                <Heading mb={2}>Users</Heading>
              </BaseStyles>
            </Route>
            <Route path="/">
              <App.Container reducers={reducers} />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};
