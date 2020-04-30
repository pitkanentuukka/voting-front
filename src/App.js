import React from 'react';
import Question from './Question';
import './App.css';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      answers: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState(prevState => {
      let answers = [... prevState.answers]
      answers[name] = value
      console.log(answers)
      this.setState(answers)

    })
  }

  componentDidMount() {
    fetch("http://localhost:7777/api/questions")
      .then(response => response.json())
      .then(data =>  {

        this.setState({
          questions: data
        })

      })
  }
  render () {
    const questionComponents = this.state.questions.map(question =>
     <Question key={question.id} id={question.id} question={question.question} handleChange = {this.handleChange} />)

    return (
      <div>
        <h1> Questions!</h1>
        {questionComponents}
      </div>
    )
  }

}
export default App;
