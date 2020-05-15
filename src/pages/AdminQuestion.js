import React from "react"

class AdminQuestion extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.edit === undefined || this.props.edit === false) {
      return (
        <div className="question">
        <p><span>{this.props.question}  </span>
        <button
        name={this.props.id}
        onClick={this.props.handleDelete}>
        Delete
        </button>
        <button
        name={this.props.id}
        onClick={this.props.enableEdit}>
        Edit
        </button>
        </p>

        </div>
      )

    } else {
      return (
        <div>
        <input
        type='text'
        name={this.props.id}
        value={this.props.edit}
        onChange={this.props.handleEdit}>
        </input>
        <button
        name={this.props.id}
        onClick={this.props.sendEdited}>
        Submit
        </button>
        <button
        name={this.props.id}
        onClick={this.props.disableEdit}>
        Cancel
        </button>
        </div>
      )
    }

  }
}
export default AdminQuestion
