import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

class AdminQuestion extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.edit === undefined || this.props.edit === false) {
      return (
        <Container className="p-4">
        <div className="question">
        <p><span>{this.props.question}  </span>
        <Button
          variant="danger"
          name={this.props.id}
          onClick={this.props.handleDelete}>
          Delete
        </Button>
        <span> </span>
        <Button
          variant="success"

          name={this.props.id}
          onClick={this.props.enableEdit}>
          Edit
        </Button>
        </p>

        </div>
        </Container>
      )

    } else {
      return (
        <ListGroup.Item>
        <div>
        <input
          type='text'
          name={this.props.id}
          value={this.props.edit}
          onChange={this.props.handleEdit}>
        </input>
        <span> </span>
        <Button
          name={this.props.id}
          onClick={this.props.sendEdited}>
          Submit
        </Button>
        <span> </span>
        <Button
          variant="secondary"
          name={this.props.id}
          onClick={this.props.disableEdit}>
          Cancel
        </Button>
        </div>
        </ListGroup.Item>
      )
    }

  }
}
export default AdminQuestion
