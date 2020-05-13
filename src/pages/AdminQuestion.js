import React from "react"

class AdminQuestion extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="question">
        <p>{this.props.question}</p>
      </div>
    )

  }
}
export default AdminQuestion
