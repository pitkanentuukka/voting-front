import React from 'react'
import QuestionList from './QuestionList'
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

class Candidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

componentDidMount() {
  console.log("candidate.js!")
}

  render() {
    return (
      <h1>hello candidate!</h1>
    )
  }
}
export default Candidate
