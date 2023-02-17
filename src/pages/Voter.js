import React from 'react'
import Question from './Question'
import CandidItem from './CandidItem'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select'

class Voter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      candidates: [],
      selectedParty: null,
      selectedDistrict: null,
      districts: [],
      parties: [],
      questions: [],
      ownAnswers: [],
      rankedCandidates: [],
      isSubmitted: false,


    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitDistrict = this.handleSubmitDistrict.bind(this);
    this.handleSelectDistrict = this.handleSelectDistrict.bind(this);

  }

  componentDidMount() {
    this.getStuff('/api/questions', 'questions');
    this.getStuff('/api/parties', 'parties');
    this.getStuff('/api/districts', 'districts');
  }

  getStuff(url, stateArray) {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then(json => {
        this.setState({ [stateArray]: json })
      })
  }


  handleSelectDistrict(selectedOption) {
    this.setState({ selectedDistrict: selectedOption.id })
  }

  handleSubmitDistrict() {
    if (this.state.selectedDistrict) {
      const url = '/api/answers/candidatesandanswers/' + this.state.selectedDistrict;
      this.getStuff(url, 'candidates')
      this.setState({ step: 2 });
    }
  }


  handleChange(event) {
    const name = parseInt(event.target.name)
    const value = event.target.value
    this.setState(prevState => {
      let answers = { ...prevState.ownAnswers }
      if (!answers[name]) {
        answers[name] = { value: value[0] }
      } else {
        answers[name].value = value
      }
      this.setState({ ownAnswers: answers })

    })
  }
  rankCandidates(candidates, voterAnswers) {
    // Step 1: Create an empty list for the ranking
    const ranking = [];

    // Step 2: Loop through each candidate and their answers
    candidates.forEach(candidate => {
      let score = 0;

      // Step 3: For each candidate, calculate a score based on the number of answers that match the voter's answers
      candidate.answers.forEach(answer => {
        const question = answer.question_id;
        const candidateAnswer = answer.answer;
        const voterAnswer = voterAnswers[question].value;
        score += (Math.abs(candidateAnswer - voterAnswer))
      });

      // Step 4: Add the candidate and their score to the ranking list
      ranking.push({
        candidate: candidate,
        score: score
      });
    });

    // Step 5: Sort the ranking list based on the scores, with the highest score at the top
    ranking.sort((a, b) => a.score - b.score);

    // Step 6: Return the ranking list
    this.setState({ rankedCandidates: ranking })
  }


  handleSubmit() {
    this.rankCandidates(this.state.candidates, this.state.ownAnswers);
    this.setState({ step: 3 });
  }


  render() {
    const districts = this.state.districts.map(item => {
      item.label = item.district
      item.value = item.id
      return item
    })

    const parties = this.state.parties.map(item => {
      item.label = item.party
      item.value = item.id
      return item
    })

    const questionComponents = this.state.questions.map(question => {
      return <Question
        key={question.id}
        id={question.id}
        question={question.question}
        handleChange={this.handleChange}
      />
    })

    if (this.state.step === 1) {
      return (
        <Container
          className="p-1">
          <Row>
            <Col>
              <Container
                className="p-2"
                maxWidth="48%">

                <Row>
                  <Col xs="2">
                    District:
                  </Col>
                  <Col xs="3">
                    <Select
                      options={districts}
                      onChange={this.handleSelectDistrict}

                    />

                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={this.handleSubmitDistrict}>submit</Button>

                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      )
    } else if (this.state.step === 2) {
      return (
        <Container
          className="p-1">
          <Row>
            <Col>
              <Container
                className="p-2"
                maxWidth="48%">


                {questionComponents}
                <Row>
                  <Col>
                    <Button onClick={this.handleSubmit}>submit</Button>

                  </Col>
                </Row>
              </Container>

            </Col>
          </Row>
        </Container>

      )
    } else if (this.state.step === 3) {
      const candidComponents = this.state.rankedCandidates.map(candidate => {
        console.log(candidate.candidate.id)
        return <CandidItem
          key={candidate.candidate.id}
          id={candidate.candidate.id}
          name={candidate.candidate.name}
          number={candidate.candidate.number}
          party={candidate.candidate.party}

          handleChange={this.handleChange}
        />
      })


      return (
        <Container>
          <Row>
            <Col>
              <h1>
                Sopivimmat ehdokkaat:
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {candidComponents}
            </Col>
          </Row>
        </Container>
      )
    }


  }
}
export default Voter
