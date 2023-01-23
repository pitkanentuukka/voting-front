import React from 'react'
import queryString from 'query-string'
import CandidateForm from './CandidateForm'
import AnswerForm from './AnswerForm'

import { Redirect } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class Candidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      candidateId: '',
      partyName: '',
      districts: [],
      selectedOption: null,
      answers: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleAnswerTextChange = this.handleAnswerTextChange.bind(this)
    this.handleDistrictChange = this.handleDistrictChange.bind(this)
    this.handleAnswersSubmit = this.handleAnswersSubmit.bind(this)
  }

  componentDidMount() {
    const value = queryString.parse(this.props.location.search);
    if (value.id && value.link) {
      fetch('/api/parties/validate?id=' + value.id + '&link=' + value.link, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "GET",

      })
        .then(r => r.json().then(data => ({ status: r.status, body: data })))
        .then(data => {
          if (data.status === 200) {

            this.setState({ step: 2, partyName: data.body[0].party })
          } else {
            this.setState({ step: 0 })
          }

        })
    } else {
      this.setState({ step: 0 })
    }

    /* get districts */
    fetch('/api/districts/', {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ districts: data })
      })

  }

  handleDistrictChange(selectedOption) {
    this.setState({ selectedOption })
  }


  handleSubmit(event) {
    this.getQuestions()

    fetch('/api/parties/addcandidate', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        number: this.state.number,
        email: this.state.email,
        district: this.state.selectedOption.id
      })
    })
      .then((response) => response.json())
      .then(json => {
        this.setState({ candidateId: json.candidateid, step: 3 })
      })
  }

  handleAnswersSubmit(event) {
    console.log(JSON.stringify({ answers: this.state.answers }));
    fetch('/api/answers/addanswers', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ answers: this.state.answers })
    })
      .then((response) => response.json())
      .then(this.setState({ step: 4 }))

  }

  getQuestions() {
    fetch('/api/questions', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then(json => {
        this.setState({ questions: json })
      })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleAnswerChange(event) {
    //const {name, value} = event.target
    const name = parseInt(event.target.name)
    const value = event.target.value
    this.setState(prevState => {
      let answers = { ...prevState.answers }
      if (!answers[name]) {
        answers[name] = { value: value[0] }
      } else {
        answers[name].value = value
      }
      this.setState({ answers: answers })
    })
  }
  handleAnswerTextChange(event) {
    const { name, value } = event.target
    this.setState(prevState => {
      let answers = prevState.answers
      if (!answers[name]) {
        answers[name] = { text: value[0] }
      } else {
        answers[name].text = value
      }
      this.setState({ answers: answers })
    })
  }



  render() {
    const step = this.state.step
    switch (step) {
      case 0:
        return (
          <Redirect to="/" />
        )
      case 1:
        return (
          <h1>authorizing, please wait</h1>
        )
      case 2:
        return (
          <CandidateForm
            partyName={this.state.partyName}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            districts={this.state.districts}
            handleDistrictChange={this.handleDistrictChange}
          />
        )
      case 3:
        const answerComponents = this.state.questions.map(question =>
          <AnswerForm
            key={question.id}
            id={question.id}
            question={question.question}
            handleChange={this.handleAnswerChange}
            handleTextChange={this.handleAnswerTextChange}
            submitHandler={this.handleAnswersSubmit}
            answerText={this.state.answers[question.id]
              && this.state.answers[question.id].text}

          />)
        return (
          <Container>
            {answerComponents}
            <Row>
              <Col>
                <Button onClick={this.handleAnswersSubmit}>submit</Button>

              </Col>
            </Row>
          </Container>
        )
      case 4:
        return (
          <h1> thank you for participating!</h1>
        )
    }
  }
}

export default Candidate
