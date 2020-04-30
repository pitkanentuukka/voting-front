import React from 'react';
import Question from './Question';
import './App.css';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      questions: []
    }
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
     <Question key={question.id} question={question.question} />)

    return (
      <div>
        <h1> Questions!</h1>
        {questionComponents}
      </div>
  )
  }

}
export default App;
