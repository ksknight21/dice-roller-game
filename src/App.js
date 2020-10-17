import React, { Component, useState } from 'react';
import './App.css';
import Game from "./components/Game";
import ErrorComponent from "./components/ErrorComponent";
import WelcomeComponent from "./components/WelcomeComponent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="WelcomeScreen">
       <Router>
          <Switch>
              <Route path="/" exact component={WelcomeComponent} />
              <Route path="/welcome" component={WelcomeComponent} />
              <Route path="/game" component={Game} />
              <Route component={ErrorComponent} />
          </Switch>
      </Router>
    </div>
  );
}





export default App;
