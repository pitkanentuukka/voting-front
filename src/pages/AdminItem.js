import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminEditItem from './AdminEditItem'

class AdminItem extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    let editItem

    if (this.props.edit) {
      editItem =
      <AdminEditItem
        id = {this.props.id}
        edit = {this.props.edit}
        handleEdit = {this.props.handleEdit}
        sendEdited = {this.props.sendEdited}
        disableEdit = {this.props.disableEdit}
      />

    } else {
      editItem = null;
    }
  /*  if (this.props.edit === undefined || this.props.edit === false) {
      editItem = null
    } else {
      editItem =
      <AdminEditItem
        id = {this.props.id}
        edit = {this.props.edit}
        handleEdit = {this.props.handleEdit}
        sendEdited = {this.props.sendEdited}
        disableEdit = {this.props.disableEdit}
      />

    }
*/
      return (
        <Container className="p-4">
          <Row>
            <Col>
            {this.props.item}
            </Col>
            <Col>
              <Button
                variant="danger"
                name={this.props.id}
                onClick={this.props.handleDelete}>
                Delete
              </Button>
            </Col>
            <Col>
              <Button
                variant="success"
                name={this.props.id}
                onClick={this.props.enableEdit}>
                Edit
              </Button>
            </Col>
          </Row>
          {editItem}
        </Container>

      )

  }
}
export default AdminItem
