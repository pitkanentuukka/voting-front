import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function AnswerTextForm(props) {
    return (

        <Row>
            <Col xs="2">Explanation</Col>
            <Col>
                <input
                    style={{ width: '100%' }}
                    type="text"
                    name={props.id}
                    value={props.answerText}
                    onChange={props.handleTextChange}
                    placeholder="enter "
                />
            </Col>
        </Row>

    )
}


