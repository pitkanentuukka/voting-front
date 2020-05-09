import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      isError: false,
      msg: '',

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount(){
    fetch('/api/authenticate/auth', {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => {
      console.log(response.status)
      if (response.status === 403) {
        this.setState({isLoggedIn : false})
      } else if(response.status === 200) {
        this.setState({isLoggedIn : true})
      }

    })
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value

    })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch('/api/authenticate', {
    method: 'POST',
    body: JSON.stringify(this.state),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      this.props.history.push('/');
      this.setState(prevState => {
        return prevState.isLoggedIn =true
      })
    } else {
    /*  this.setState(prevState => {
      return prevState.msg = res.json()})*/
      console.log(res.json())

    }
  })
  .catch(err => {
    console.error(err);
  });
}


  render(){
    console.log(this.state.isLoggedIn)
    if (this.state.isLoggedIn) {
      return <div><p>you've successfully logged in</p>
       <Link to="/admin">Admin panel</Link>
       </div>
    }
    return (
      <div>
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
      <p>{this.state.msg}</p>
      </div>
    )
  }
}
export default Login
