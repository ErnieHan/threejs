import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Basic from "./components/Basic";
import Ascii from "./components/Ascii";
import Stencil from "./components/Stencil";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Title>Three.js | erniexx</Title>
        <Router>
          <Switch>
            <Route exact path="/">
              <Basic />
            </Route>
            <Route path="/basic">
              <Basic />
            </Route>
            <Route path="/ascii">
              <Ascii />
            </Route>
            <Route path="/stencil">
              <Stencil />
            </Route>
            <Route path="*"></Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

const Title = styled.div`
  position: fixed;
  transform: rotate(-90deg);
  top: 50%;
`;
