import React from "react"
import AdminQuestion from './AdminQuestion'
import NewQuestionForm from './NewQuestionForm'
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';



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
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.sendEdited = this.sendEdited.bind(this)
    this.enableEdit = this.enableEdit.bind(this)
    this.disableEdit = this.disableEdit.bind(this)
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
        data.forEach((item) => {
          item.edit = false
        })
        this.setState({
          questions: data
        })
      })
  }

  handleEdit(event) {
    const {name, value} = event.target
    this.setState(prevState => {
      let questions = prevState.questions.map(question => {
        if (question.id == name) {
          question.edit = value
        }
      })
      return questions
    })
  }

  sendEdited(event) {
    const name = event.target.name
    const editedQuestion = this.state.questions.filter(question => {
      return question.id == name
    })

    fetch("/api/admin/editquestion/"+ name, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({question: editedQuestion[0].edit})
    })
    .then(response => {
      if (response.status === 200) {

        this.setState(prevState => {
          let questions = this.state.questions.map(question => {
            if (question.id == name) {
              // looks like whatever is here doesn't occur synchronously
              // so we need to call this twice
              question.question = question.edit
            }
          })
          return questions
        })
        this.setState(prevState => {
          let questions = this.state.questions.map(question => {
            if (question.id == name) {
              delete question.edit
            }
          })
          return questions
        })
      } else {
        // maybe let the user try again
        // display an error?
      }
    })
  }

  enableEdit(event) {
    const name = event.target.name
    this.setState(prevState => {
      let questions = prevState.questions.map(question => {
        if (question.id == name) {
          question.edit = question.question
        }
      })
      return questions
    })
  }


  disableEdit(event) {
    const name = event.target.name
    this.setState(prevState => {
      let questions = prevState.questions.map(question => {
        if (question.id == name) {
          delete question.edit
        }
      })
      return questions
    })
  }

  handleDelete(event) {
    const name = event.target.name
    fetch('/api/admin/deletequestion/'+ name, {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    this.setState(prevState => {
      let questions = prevState.questions.filter(item => item.id != name)
      return {questions: questions}
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
     <AdminQuestion
      key={question.id}
      id={question.id}
      question={question.question}
      edit={question.edit}
      handleDelete={this.handleDelete}
      handleEdit={this.handleEdit}
      sendEdited={this.sendEdited}
      enableEdit={this.enableEdit}
      disableEdit={this.disableEdit}
    />)

    return (
      <Container className="p-3">
        <h2> Questions!</h2>
        {adminQuestionComponents}
        <NewQuestionForm
          data={this.state.newQuestion}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Container>
    )
  }
}
export default AdminQuestionList;
