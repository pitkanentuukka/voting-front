import React from "react"
import NewItemForm from './NewItemForm'
import AdminItem from './AdminItem'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
/**
* Displays an editable list of items. For every item, there's a delete button,
* an edit button that displays an input field with the item and save / cancel buttons.
* Then there's a form for adding new items.
* The API URLs for calls need to be given as props. They are:
* getItems, addItem, editItem, deleteItem
*
* Other props: title, itemName
*/
class AdminItemList extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      newItem: '',
      msg: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.sendEdited = this.sendEdited.bind(this)
    this.enableEdit = this.enableEdit.bind(this)
    this.disableEdit = this.disableEdit.bind(this)
  }


  componentDidMount() {
    const itemName = this.props.itemName
    fetch(this.props.getItems, {
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => {
        data.forEach((item) => {
          item.edit = false
          item.item = item[itemName]
          delete item[itemName]

        })
        this.setState({
          items: data
        })
      })
  }

  handleEdit(event) {
    const name = +event.target.name;
    const value = event.target.value
    this.setState(prevState => {
      let items = prevState.items.map(item => {
        if (item.id === name) {
          item.edit = value
        }
      })
      return items
    })
  }

  sendEdited(event) {
    const itemName = this.props.itemName
    const name = event.target.name
    const editedItem = this.state.items.filter(item => {
      return item.id === parseInt(name)
    })

    fetch(this.props.editItem + name, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({ [itemName]: editedItem[0].edit })
    })
      .then(response => {
        if (response.status === 200) {

          this.setState(prevState => {
            let items = this.state.items.map(item => {
              if (item.id === parseInt(name)) {
                // looks like whatever is here doesn't occur synchronously
                // so we need to call this twice
                item.item = item.edit
              }
            })
            return items
          })
          this.setState(prevState => {
            let items = this.state.items.map(item => {
              if (item.id === parseInt(name)) {
                delete item.edit
              }
            })
            return items
          })
        } else {
          // maybe let the user try again
          // display an error?
        }
      })
  }

  enableEdit(event) {
    // + converts to int, comparison fails otherwise
    const name = +event.target.name
    this.setState(prevState => {
      let items = prevState.items.map(item => {
        if (item.id === name) {
          item.edit = item.item


        }
      })
      return items
    })
  }


  disableEdit(event) {
    const name = +event.target.name
    this.setState(prevState => {
      let items = prevState.items.map(item => {
        if (item.id === name) {
          delete item.edit
        }
      })
      return items
    })
  }

  handleDelete(event) {
    if (window.confirm('delete ' + this.props.itemName + '?')) {
      const name = +event.target.name
      fetch(this.props.deleteItem + name, {
        mode: "cors",
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      this.setState(prevState => {
        let items = prevState.items.filter(item => item.id !== parseInt(name))
        return { items: items }
      })
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }


  handleSubmit(event) {
    event.preventDefault()
    let itemName = this.props.itemName
    fetch(this.props.addItem, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({ [itemName]: this.state.newItem })
    })
      .then(r => r.json().then(data => ({ status: r.status, body: data })))
      .then(data => {
        if (data.status === 200) {
          this.setState({ msg: "item added" })
          this.setState(prevState => {
            let newItem = {}
            newItem.id = data.body.id
            newItem.item = data.body[this.props.itemName]
            if (data.body.link) {
              newItem.link = data.body.link
            }
            let items = prevState.items.concat(newItem)
            return { items: items }
          })
          this.setState({ newItem: '' })
        } else if (data.status === 400) {
          this.setState({ msg: "invalid request" })
        } else if (data.status === 500) {
          this.setState({ msg: "server error" })
        }
      })
  }

  render() {
    const adminItemComponents = this.state.items.map(item => {
      let fullLink
      if (item.link) {

        fullLink = (<Link to={{
          pathname: 'Candidate',
          search: `?id=${item.id}&link=${item.link}`

        }}>Link!</Link>)
      }
      return <AdminItem
        key={item.id}
        id={item.id}
        item={item.item}
        edit={item.edit}
        link={fullLink}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEdit}
        sendEdited={this.sendEdited}
        enableEdit={this.enableEdit}
        disableEdit={this.disableEdit}
      />
    })

    return (
      <Container className="p-3">
        <h2> {this.props.title}!</h2>
        {adminItemComponents}
        <NewItemForm
          data={this.state.newItem}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Container>
    )
  }
}
export default AdminItemList;
