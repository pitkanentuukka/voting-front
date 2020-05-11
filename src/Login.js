import React from 'react'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      //isError: false,
      msg: '',

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  componentDidMount(){
    fetch('/api/authenticate/auth', {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => {
      if (response.status === 403) {
        this.setState({isLoggedIn : false})
      } else if(response.status === 200) {
        this.setState({isLoggedIn : true})
      }

    })
    .catch(err => {
      console.error(err);
    });
  }

  onLogout(event) {
    fetch('/api/authenticate/logout', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.setState({isLoggedIn: false})
        this.setState({msg: "logged out!"})
      }
    })
    .catch(err => {
      console.error(err);
    });

  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value

    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({msg: ""})
    fetch('/api/authenticate', {
    method: 'POST',
    body: JSON.stringify(this.state),
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.setState({isLoggedIn: true})
      } else if (res.status === 400 || res.status === 403){
        this.setState({msg: "invalid email or password"})
      }
    })
    .catch(err => {
      console.error(err);
    });
  }


  render(){
    if (this.state.isLoggedIn) {
      return <div><p>you've successfully logged in</p>
       <Link to="/admin">Admin panel</Link>
       <button onClick={this.onLogout}>Log out</button>
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
