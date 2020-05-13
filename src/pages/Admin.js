import React from 'react'
import { Redirect } from 'react-router-dom'
import AdminQuestionList from './AdminQuestionList'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // when these both are false the user is in kind of a limbo
      // either one will have to be true for something to happen
      redirect: false,
      authorized: false,
    }
  }

  componentDidMount(){
    console.log("component mounted")
    fetch('/api/authenticate/auth', {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => {
      if (response.status === 403) {
        // forbidden, redirect
        this.setState({redirect : true})
      } else if(response.status === 200) {
        // if not redirect, load the admin components or data for them?
        this.setState({authorized : true})
      }

    })
  }
  render(){
    if (this.state.redirect) {
        return(
           <Redirect to="/" />

        )
    }

    if (this.state.authorized) {
      return(
        <div><h1>Hello Admin</h1>
        <AdminQuestionList />
        </div>


      )
    }
    if (!this.state.authorized && !this.state.redirect) {
      return (
        <h1>authorizing, please wait</h1>
      )
    }
  }
}
export default Admin
