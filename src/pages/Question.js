import React, { useEffect } from "react"
import QuestionForm from "./QuestionForm"
import QuestionText from "./QuestionText"
import AnswerForm from "./AnswerForm"
import AnswerText from "./AnswerText"
import Container from 'react-bootstrap/Container';

/*

props: questionText, candidAnswer, candidAnswerText, voterAnswer, onChange, onAnswerTextChange


use cases:
1. candidate answering questions
2. voter answering questions
3. voter comparing answers 

case 1: props.candidAnswers && voterAnswers are null, candid is true
in this case we also display answerForm

case 2: candid is also false. We don't display answerForm.

case 3: candid false, candidAnswers & voterAnswers contain stuff. 
We show two questionForms, one for eachs' answers, and answertext component.

questiontext is rendered in all cases.

*/

export default function Question(props) {


  return (
    <Container>
      <QuestionText text={props.question} />
      <QuestionForm selectedValue={props.value} handleChange={props.handleChange} id={props.id} disabled={props.disabled} />
      {props.candid && <AnswerForm onAnswerTextChange={props.onAnswerTextChange} />}
      {props.candidateAnswer && <QuestionForm selectedValue={props.candidateAnswer} disabled={true} />}
      {props.candidateAnswerText && <AnswerText value={props.candidateAnswerText}

        id={props.id} />}

    </Container >
  )
}

