import React from 'react'
import Question from './Question'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select'

class Voter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      candidates: [],

      selectedParty: null,
      selectedDistrict: null,
      districts: [],
      parties: [],
      answers: [],
      questions: [],
      ownAnswers: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectParty = this.handleSelectParty.bind(this)
    this.handleSelectDistrict = this.handleSelectDistrict.bind(this)
    this.filterCandidates = this.filterCandidates.bind(this)

  }

  componentDidMount() {
    this.getStuff('/api/questions', 'questions')
    this.getStuff('/api/parties', 'parties')
    this.getStuff('/api/districts', 'districts')
    this.getStuff('/api/answers', 'answers')
    this.getStuff('/api/candidates', 'candidates')
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
      this.setState({[stateArray]: json})
    })
  }

  handleSelectParty(selectedOption) {
    this.setState({selectedParty: selectedOption}, this.filterCandidates)
  }
  handleSelectDistrict(selectedOption) {
    this.setState({selectedDistrict: selectedOption}, this.filterCandidates)
  }


  filterCandidates() {
    let filteredCandidates = this.state.candidates
    console.log(this.state.selectedDistrict);
    console.log(this.state.selectedParty);

    // filter by party
    if (this.state.selectedParty !== null) {
      let partyFilteredCandidates = []
      for (let i = 0; i < this.state.selectedParty.length; i++) {
        for (let j = 0; j < filteredCandidates.length; j++) {
          if (parseInt(this.state.selectedParty[i].id)
              === parseInt(filteredCandidates[j].party_id)) {
                  partyFilteredCandidates.push(filteredCandidates[j])
          }
        }
      }
      filteredCandidates = partyFilteredCandidates
    }
    // filter by district
    if (this.state.selectedDistrict !== null) {
      let districtFilteredCandidates = []
      for (let i = 0; i < this.state.selectedDistrict.length; i++) {
        for (let j = 0; j < filteredCandidates.length; j++) {
          if (parseInt(this.state.selectedDistrict[i].id)
              === parseInt(filteredCandidates[j].district_id)) {
                  districtFilteredCandidates.push(filteredCandidates[j])
          }
        }
      }
      filteredCandidates = districtFilteredCandidates
    }
    this.setState({filteredCandidates : filteredCandidates})
  }

  handleChange(event) {
    const name = parseInt(event.target.name)
    const value = event.target.value
    this.setState(prevState => {
      let answers = {...prevState.ownAnswers}
      if(!answers[name]) {
        answers[name] = {value: value[0]}
      } else {
        answers[name].value = value
      }
      this.setState({ownAnswers: answers})
    })
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
        handleChange = {this.handleChange}
        />
      })


    return (
      <Container  className="p-1">

      <Row>
      <Col xs="2">
       District:
      </Col>
      <Col xs="3">
       <Select
         options={districts}
         onChange={this.handleSelectDistrict}
         isMulti={true}
       />

      </Col>
      </Row>
      <Row>
      <Col xs="2">
        Party:
      </Col>
      <Col xs="3">
        <Select
          options={parties}
          onChange={this.handleSelectParty}
          isMulti={true}
        />
        </Col>
        </Row>
        {questionComponents}
      </Container>
    )
  }
}
export default Voter
