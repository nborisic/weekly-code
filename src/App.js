import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React from 'react';
import List from './List';
import ScrollAnimation from './week-one';
import Gesture from './week-two';
import Letters from './week-three';
import Numbers from './week-four';
import Exit from './week-five';

function App() {
  return (
    
    <Router>      
      <Switch>
      <Route path='/' component={List} exact />
      <Route exact path="/scroll-animation">
        <ScrollAnimation />
      </Route>
      <Route exact path="/gesture">
        <Gesture />
      </Route>
      <Route exact path="/letters">
        <Letters />
      </Route>
      <Route exact path="/numbers">
        <Numbers />
      </Route>
      <Route exact path="/exit">
        <Exit />
      </Route>
      </Switch>
    </Router>
    
  );
}

export default App;



