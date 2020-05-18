import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NewItemForm extends React.Component {
  constructor(props) {
    super(props)

  }



  render() {
    return (
      <Container className="p-4">
        <Row>
          <Col>
            <input
              style={{width:'100%'}}
              type="text"
              name="newItem"
              value={this.props.newItem}
              onChange={this.props.handleChange}
              placeholder="enter "
              required
            />
          </Col>
          <Col>
            <Button onClick={this.props.handleSubmit}>submit</Button>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.msg}
          </Col>
        </Row>
      </Container>
    )
  }
}
export default NewItemForm
