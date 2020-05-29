import React from 'react'
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AnswerForm(props) {
  const labels = ['strongly disagree', 'disagree', 'no opinion', 'agree', 'strongly agree']
  return (
    <Container className="p-4">
      <Row>
        <Col>
          {props.question}
        </Col>
      </Row>
      <Row>

          {labels.map((label, idx) => {
             return (
               <Col>
                <label key={label}>{label}</label>
                <input
                  type="radio"
                  name={props.id}
                  value={idx + 1}
                  onChange={event => props.handleChange(event)}
                  />

              </Col>

             )
          })}
      </Row>
      <Row>
        <Col xs="2">Explanation</Col>
        <Col>
          <input
            style={{width:'100%'}}
            type="text"
            name={props.id}
            value={props.answerText}
            onChange={props.handleTextChange}
            placeholder="enter "
            value={props.answerText}

          />
        </Col>

      </Row>
      </Container>


  )

}


export default AnswerForm
