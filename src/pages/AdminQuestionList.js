import React from "react"
import AdminQuestion from './AdminQuestion'
import NewQuestionForm from './NewQuestionForm'
class AdminQuestionList extends React.Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      newQuestion: '',
      msg: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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


  handleChange(event) {
    const {name, value} = event.target

    this.setState({[name]: value})
  }



   handleSubmit(event) {
    event.preventDefault()
    fetch("/api/admin/addquestion", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({question: this.state.newQuestion})
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(data => {
      if (data.status === 200) {
        this.setState({msg: "question added"})
        this.setState(prevState => {
          ]
          let questions = prevState.questions.concat(data.body)
          return { questions: questions}

        })
        this.setState({newQuestion : ''})
      } else if (data.status === 400) {
        this.setState({msg: "invalid request"})
      } else if (data.status === 500) {
        this.setState({msg: "server error"})
      }
    })
  }




  render () {
    const adminQuestionComponents = this.state.questions.map(question =>
     <AdminQuestion key={question.id} id={question.id} question={question.question} />)

    return (
      <div>
        <h1> Questions!</h1>
        {adminQuestionComponents}
        <NewQuestionForm data={this.state.newQuestion} handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}/>
      </div>
    )
  }

}
export default AdminQuestionList;
