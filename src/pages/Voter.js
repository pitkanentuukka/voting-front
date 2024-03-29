import React from 'react'
import CandidItem from './CandidItem'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Question from './Question'


class Voter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      candidates: [],
      selectedDistrict: null,
      selectedCandidate: null,
      districts: [],
      parties: [],
      questions: [],
      ownAnswers: [],
      rankedCandidates: [],
      comparisonComponents: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitDistrict = this.handleSubmitDistrict.bind(this);
    this.handleSelectDistrict = this.handleSelectDistrict.bind(this);
    this.handleSelectCandidate = this.handleSelectCandidate.bind(this);
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCandidate !== this.state.selectedCandidate) {
      const candidate = this.state.rankedCandidates[this.state.selectedCandidate];
      if (candidate) {
        const comparisonComponents = this.state.questions.map(question => {
          return <Question
            key={question.id}
            id={question.id}
            question={question.question}
            handleChange={this.handleChange}
            disabled={true}
            value={question.value}
            candidateAnswer={candidate.candidate.answers.find(answer => answer.question_id === question.id).answer}
            candidateAnswerText={candidate.candidate.answers.find(answer => answer.question_id === question.id).text}
          />
        });
        this.setState({ comparisonComponents: comparisonComponents });
      }
    }
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

  handleSelectCandidate(selectedCandidate) {
    const updatedRankedCandidates = this.state.rankedCandidates.map((candidate, index) => {
      if (selectedCandidate.id === candidate.id) {
        return {
          ...candidate,
          selected: true,
        }
      } else {
        return {
          ...candidate,
          selected: false,
        }
      }
    })
    this.setState({
      rankedCandidates: updatedRankedCandidates,


      selectedCandidate: selectedCandidate,

    })
  }


  handleChange(event) {
    const name = parseInt(event.target.name);
    const value = 1 + parseInt(event.target.value);
    this.setState(prevState => {
      const newQuestions = prevState.questions.map(question => {
        if (question.id === name) {
          return {
            ...question,
            value
          };
        }
        return question;
      });
      return { questions: newQuestions };
    });
  }

  rankCandidates(candidates, ownAnswers) {
    // Step 1: Create an empty list for the ranking
    const ranking = [];

    // Step 2: Loop through each candidate and their answers
    candidates.forEach(candidate => {
      let score = 0;

      // Step 3: For each candidate, calculate a score based on the number of answers that match the voter's answers
      candidate.answers.forEach(answer => {
        const question = answer.question_id;
        const candidateAnswer = answer.answer;
        const voterAnswer = ownAnswers.find(a => a.id === question)?.value;

        if (voterAnswer !== undefined) {
          score += Math.abs(candidateAnswer - voterAnswer);
        }
      });

      // Step 4: Add the candidate and their score to the ranking list
      ranking.push({
        candidate: candidate,
        score: score
      });
    });

    // Step 5: Sort the ranking list based on the scores, with the lowest score at the top
    ranking.sort((a, b) => a.score - b.score);

    // Step 6: Return the ranking list
    this.setState({ rankedCandidates: ranking })
  }
  async sendAnswers() {
    fetch('/api/answers/addvoteranswers', {
      headers: {
        'Content-Type': 'application/json',

      },
      method: 'POST',
      body: JSON.stringify({
        district_id: this.state.selectedDistrict,
        answers: this.state.questions,
      })

    })
  }

  async handleSubmit() {
    await this.sendAnswers();
    this.rankCandidates(this.state.candidates, this.state.questions);
    this.setState({ step: 3 });
    this.setState({ selectedCandidate: 0 })
  }


  render() {
    const districts = this.state.districts.map(item => {
      item.label = item.district
      item.value = item.id
      return item
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
                  <Col xs="3" >
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
      const questionComponents = this.state.questions.map(question => {
        return <Question
          key={question.id}
          id={question.id}
          question={question.question}
          handleChange={this.handleChange}
          value={question.value}
        />
      })

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
        const selected = candidate.candidate.id === this.state.selectedCandidate;
        return (
          <CandidItem
            key={candidate.candidate.id}
            id={candidate.candidate.id}
            name={candidate.candidate.name}
            number={candidate.candidate.number}
            party={candidate.candidate.party}
            selected={selected}
            handleSelectCandidate={this.handleSelectCandidate}
          />
        );
      });


      return (
        <Container className="p-1">
          <Container className="p-2">

            <h1>
              Sopivimmat ehdokkaat:
            </h1>


            {candidComponents}


          </Container>
          <Container
            className="p-2"
            maxWidth="48%">

            {this.state.comparisonComponents}

          </Container>
        </Container>
      )
    }


  }
}
export default Voter
