import React from "react"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state{
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log("TODO: authenticate!")

  }
  render(){
    return (
      eturn (
      <form onSubmit={this.handleSubmit}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
       <input type="submit" value="Submit"/>
      </form>
    )
  }


}
