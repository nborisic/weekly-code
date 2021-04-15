import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React from 'react';
import List from './List';
import ScrollAnimation from './week-one';
import Gesture from './week-two';

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
      </Switch>
    </Router>
    
  );
}

export default App;



