/*
 * @Date: 2019-11-13 00:13:15
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-17 15:43:00
 * @content: I
 */
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Login from "./login";
import Admin from "./admin";

const Main = () => {
  return (
    <Router>
      <Route path='/' exact component={Login}></Route>
      <Route path='/admin/' component={Admin}></Route>
    </Router>
  );
};

export default Main;
