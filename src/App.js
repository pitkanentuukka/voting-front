import React, {useState} from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import QuestionList from './pages/QuestionList';
import Login from './Login';
import Admin from './pages/Admin'
import Voter from './pages/Voter'
import Candidate from './pages/Candidate'
import Home from './pages/Home'
import PrivateRoute from './PrivateRoute'

function App() {

  return (
      <Router>
        <Route exact path='/' component={Home} />
        <PrivateRoute exact path='/admin' component={Admin} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/voter' component={Voter} />
        <Route exact path='/candidate' component={Candidate} />

      </Router>
  )
}

export default App;
