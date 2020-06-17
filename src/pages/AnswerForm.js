import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AnswerForm(props) {
  const labels = ['strongly disagree', 'disagree', 'no opinion', 'agree', 'strongly agree']
  return (
    <Container className="p-4">

      <Row>
        <Col>
          <h4>{props.question}</h4>
        </Col>
      </Row>

      <Row>
        {labels.map((label, idx) => {
           return (
             <div>
            <Col>
              <label key={label}>{label}</label>
            </Col>
            <Col xs="1">
              <input
                type="radio"
                name={props.id}
                value={idx + 1}
                onChange={event => props.handleChange(event)}
                />

            </Col>
            </div>
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
