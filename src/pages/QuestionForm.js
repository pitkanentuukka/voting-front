import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect } from 'react';
import AnswerText from './AnswerText';


/* This is just radio buttons. Hopefully. */

export default function QuestionForm(props) {
    /* props: 
    enabled: usually true, but disabled for candidates answers when comparing
    value: null when answering, 1-5 when comparing answers
    */

    const labels = ['strongly disagree', 'disagree', 'no opinion', 'agree', 'strongly agree']
    const value = props.selectedValue;
    const id = props.id;
    useEffect(() => {
        console.log(`selectedValue for question ${id} changed to ${value}`);
    }, [value, id]);

    return (
        <Container>
            <Row>
                {labels.map((label, idx) => {
                    return (
                        <span key={label}>

                            <Col>
                                <label key={label}>{label}</label>
                            </Col>
                            <Col xs="1">
                                <input
                                    type="radio"
                                    name={props.id}
                                    value={idx}
                                    disabled={props.disabled}
                                    onChange={e => props.handleChange(e)}
                                    checked={idx + 1 === props.selectedValue}
                                />

                            </Col>

                        </span>
                    )
                })}
            </Row>
            {props.answerText && <AnswerText>props.answerText</AnswerText>}
        </Container>
    )

}