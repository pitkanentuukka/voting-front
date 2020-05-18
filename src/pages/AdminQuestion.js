import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class AdminQuestion extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.edit === undefined || this.props.edit === false) {
      return (
        <Container className="p-4">
        <Row>
        <Col>
        {this.props.question}
        </Col>
        <Col>
        <Button
          variant="danger"
          name={this.props.id}
          onClick={this.props.handleDelete}>
          Delete
        </Button>
        </Col>
        <Col>
        <Button
          variant="success"

          name={this.props.id}
          onClick={this.props.enableEdit}>
          Edit
        </Button>
        </Col>
</Row>

        </Container>
      )

    } else {
      return (
        <Container className="p-4">
        <Row>
        <Col>
        {this.props.question}
        </Col>
        <Col>
        <Button
          variant="danger"
          name={this.props.id}
          onClick={this.props.handleDelete}>
          Delete
        </Button>
        </Col>
        <Col>
        <Button
          variant="success"

          name={this.props.id}
          onClick={this.props.enableEdit}>
          Edit
        </Button>
        </Col>
        </Row>


        <Row>
        <Col>
        <input
          style={{width:'100%'}}
          type='text'
          name={this.props.id}
          value={this.props.edit}
          onChange={this.props.handleEdit}>
        </input>
        </Col>
        <Col>
        <Button
          name={this.props.id}
          onClick={this.props.sendEdited}>
          Submit
        </Button>
        </Col>
        <Col>
        <Button
          variant="secondary"
          name={this.props.id}
          onClick={this.props.disableEdit}>
          Cancel
        </Button>
        </Col>
        </Row>
        </Container>

      )
    }

  }
}
export default AdminQuestion
