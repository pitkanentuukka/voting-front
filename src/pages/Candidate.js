import React from 'react'
import queryString from 'query-string'
import CandidateForm from './CandidateForm'
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class Candidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      validLink :  '',
      partyName : '',

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let validLink
    const value=queryString.parse(this.props.location.search);
    if (value.id && value.link) {
      fetch('/api/parties/validate?id=' + value.id + '&link=' + value.link, {
        headers: {
          'Content-Type': 'application/json',
        },
          method: "GET",

      })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(data => {
        if (data.status === 200) {
          console.log(data.body[0].party);
          this.setState({validLink : true, partyName: data.body[0].party})
        } else {
          this.setState({validLink : false})
        }

      })
    } else {
      this.setState({validLink : false})
    }
  }

  handleSubmit(event) {
    console.log("submit!");
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({[name]: value})
  }


  render() {
    return (
      <CandidateForm
        partyName={this.state.partyName}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default Candidate
