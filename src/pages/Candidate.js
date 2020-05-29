import React from 'react'
import queryString from 'query-string'
import CandidateForm from './CandidateForm'
import AnswerForm from './AnswerForm'

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
      districts: [],
      selectedOption: null,
      answers: {},
      answerTexts: {},
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleAnswerTextChange = this.handleAnswerTextChange.bind(this)
    this.handleDistrictChange = this.handleDistrictChange.bind(this)
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

          this.setState({validLink : true, partyName: data.body[0].party})
        } else {
          this.setState({validLink : false})
        }

      })
    } else {
      this.setState({validLink : false})
    }

    /* get districts */
    fetch('/api/districts/', {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
      .then(response => response.json())
      .then(data =>  {

        this.setState({districts: data})
    })

  }

  handleDistrictChange( selectedOption ) {
    console.log(selectedOption);
    this.setState({ selectedOption})
  }


  handleSubmit(event) {
    this.getQuestions()

    //console.log("submit!");
    fetch('/api/parties/addcandidate', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({name: this.state.name,
        number: this.state.number,
        district: this.state.selectedOption.id })
    })
    .then((response) => response.json())
    .then(json => {
      this.setState({candidateId: json.candidateid})
    })
    this.getQuestions()
  }

  getQuestions() {
    fetch('/api/questions', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "GET",
    })
    .then((response) => response.json())
    .then(json => {
      this.setState({questions: json})
    })
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleAnswerChange(event) {
    const {name, value} = event.target
    this.setState(prevState => {
      let answers = prevState.answers
      answers[name] = value
      this.setState({answers: answers})
    })
  }
  handleAnswerTextChange(event) {
    const {name, value} = event.target
    this.setState(prevState => {
      let answerTexts = prevState.answerTexts
      answerTexts[name] = value
      this.setState({answerTexts: answerTexts})
    })
  }
  render() {
    if (!this.state.candidateId) {

      return (
        <CandidateForm
          partyName={this.state.partyName}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          districts={this.state.districts}
          handleDistrictChange={this.handleDistrictChange}
        />
      )
    } else {
      const answerComponents = this.state.questions.map(question =>
       <AnswerForm
        key={question.id}
        id={question.id}
        question={question.question}
        handleChange = {this.handleAnswerChange}
        handleTextChange = {this.handleAnswerTextChange}
        answerText = {this.state.answerTexts[question.id]}

        />)

      return (
        <Container>
          {answerComponents}
        </Container>
      )
    }
  }
}

export default Candidate
