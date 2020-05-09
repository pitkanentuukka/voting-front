import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      answers: []
      /*answers: [{id: "", value:""}]*/
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState(prevState => {
      let answers = [...prevState.answers]
      answers[name] = value
      
      this.setState(answers)

    })
  }

  componentDidMount() {
    fetch("/api/questions", {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
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
export default QuestionList;
