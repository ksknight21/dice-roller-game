import React from 'react';
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
              <Route path="/" exact component={Game} />
              <Route path="/game" component={Game} />
              <Route component={Game} />
          </Switch>
      </Router>
    </div>
  );
}





export default App;
