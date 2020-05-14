import React from "react"

class AdminQuestion extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="question">
        <p><span>{this.props.question}  </span>
        <button name={this.props.id} onClick={this.props.handleDelete}>delete</button></p>
      </div>
    )

  }
}
export default AdminQuestion
