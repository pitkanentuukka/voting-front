import React from "react"
import Button from 'react-bootstrap/Button';
class NewQuestionForm extends React.Component {
  constructor(props) {
    super(props)

  }



  render() {
    return (

      <div>
      <form onSubmit={this.props.handleSubmit}>
      <label>
      <input
        type="text"
        name="newQuestion"
        value={this.props.newQuestion}
        onChange={this.props.handleChange}
        placeholder="enter question"
        required
      />
      <Button>submit</Button>
      </label>
      <p>{this.props.msg}</p>
      </form>
      </div>
    )
  }
}
export default NewQuestionForm
