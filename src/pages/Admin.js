import React from 'react'
import { Redirect } from 'react-router-dom'
import AdminItemList from './AdminItemList'
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

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
        // if not redirect, load the admin components
        this.setState({authorized : true})
      }

    })
  }
  render(){
    if (this.state.redirect) {
        return (
           <Redirect to="/" />
        )
    }

    if (this.state.authorized) {
      return(
        <Container  className="p-1">
        <Tabs defaultActiveKey="Questions" id="admin-page-tabs">
          <Tab eventKey="Questions" title="Questions">
            <h1>Hello Admin</h1>
            <Container  className="p-2">
              <AdminItemList
                title = 'Questions'
                getItems = '/api/questions/'
                deleteItem = '/api/admin/deletequestion/'
                editItem = '/api/admin/editquestion/'
                addItem = '/api/admin/addquestion/'
                itemName = 'question'

               />
            </Container>
          </Tab>
          <Tab eventKey="Districts" title="Districts">
            <h1>Hello Admin</h1>
            <Container  className="p-2">

              <AdminItemList
                title = 'Districts'
                getItems = '/api/districts/'
                deleteItem = '/api/admin/deletedistrict/'
                editItem = '/api/admin/editdistrict/'
                addItem = '/api/admin/adddistrict/'
                itemName = 'district'

               />
            </Container>


          </Tab>
          <Tab eventKey="Parties" title="Parties">
            <h1>Hello Admin</h1>
            <Container  className="p-2">
            <AdminItemList
              title = 'Parties'
              getItems = '/api/admin/partiesandlinks'
              deleteItem = '/api/admin/deleteparty/'
              editItem = '/api/admin/editparty/'
              addItem = '/api/admin/addparty/'
              itemName = 'party'

             />
            </Container>
            </Tab>
          </Tabs>
        </Container>

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
