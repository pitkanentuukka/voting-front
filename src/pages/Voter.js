import React from 'react'
import QuestionList from './QuestionList'
class Voter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <QuestionList />
    )
  }
}
export default Voter
