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
  /* const value = props.value;
   const id = props.id;
   useEffect(() => {
     console.log(`selectedValue for question ${id} changed to ${value}`);
   }, [value, id]);*/

  return (
    <Container>
      <QuestionText text={props.question} />
      <QuestionForm selectedValue={props.value} handleChange={props.handleChange} id={props.id} />
      {props.candid && <AnswerForm onAnswerTextChange={props.onAnswerTextChange} />}
      {props.candidAnswer && <QuestionForm value={props.candidAnswer.value} disabled={true} />}
      {props.candidAnswerText && <AnswerText value={props.candidAnswerText}

        id={props.id} />}

    </Container >
  )
}



/*function Question(props) {
  return (
    <div className="question">
      <p className="question-text">{props.question}</p>
      <label>strongly disagree</label>
      <input className="radio"
        type="radio"
        name={props.id}
        value="1"
        onChange={props.handleChange}>
      </input>

      <label> disagree</label>
      <input className="radio"
        type="radio"
        name={props.id}
        value="2"
        onChange={props.handleChange}>
      </input>

      <label>no opinion</label>
      <input className="radio"
        type="radio"
        name={props.id}
        value="3"
        onChange={props.handleChange}>
      </input>

      <label> agree</label>
      <input className="radio"
        type="radio"
        name={props.id}
        value="4"
        onChange={props.handleChange}>
      </input>

      <label>strongly agree</label>
      <input className="radio"
        type="radio"
        name={props.id}
        value="5"
        onChange={props.handleChange}>
      </input>

    </div>
  )
}

export default Question 

*/
