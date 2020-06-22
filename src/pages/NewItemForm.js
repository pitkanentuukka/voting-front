import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NewItemForm(props) {
  return (
    <Container className="p-4">
      <Row>
        <Col>
          <input
            style={{width:'100%'}}
            type="text"
            name="newItem"
            value={props.newItem}
            onChange={props.handleChange}
            placeholder="enter "
            required
          />
        </Col>
        <Col>
          <Button onClick={props.handleSubmit}>submit</Button>
        </Col>
        <Col>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.msg}
        </Col>
      </Row>
    </Container>
  )
}
export default NewItemForm
