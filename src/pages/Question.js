import React from "react"

function Question(props) {
  return (
    <div className="question">
      <p>{props.question}</p>
      <label>strongly disagree</label>
      <input
        type="radio"
        name={props.id}
        value="1"
        onChange={props.handleChange}>
      </input>

      <label> disagree</label>
      <input
        type="radio"
        name={props.id}
        value="2"
        onChange={props.handleChange}>
      </input>

      <label>no opinion</label>
      <input
        type="radio"
        name={props.id}
        value="3"
        onChange={props.handleChange}>
      </input>

      <label> agree</label>
      <input
        type="radio"
        name={props.id}
        value="4"
        onChange={props.handleChange}>
      </input>

      <label>strongly agree</label>
      <input
        type="radio"
        name={props.id}
        value="5"
        onChange={props.handleChange}>
      </input>

    </div>
  )
}

export default Question
