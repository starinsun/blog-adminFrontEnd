/*
 * @Date: 2019-11-13 00:13:15
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-17 15:43:00
 * @content: I
 */
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";
import Login from "./login";
import Admin from "./admin";

function PrivateRoute({ component }) {
  const Admin = component;
  return (
    <Route
      render={() =>
        localStorage.getItem("login") ? (
          <Admin />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
}

const Main = () => {
  return (
    <Router>
      <Route path='/' exact component={Login}></Route>
      <PrivateRoute path='/admin/' component={Admin}></PrivateRoute>
    </Router>
  );
};

export default Main;
