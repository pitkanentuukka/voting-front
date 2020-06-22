import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminEditItem from './AdminEditItem'

function AdminItem(props) {

  let editItem
  let link

  if (props.link) {
    link = <Col>{props.link}</Col>
  } else {
    link = null
  }

  if (props.edit) {
    editItem =
    <AdminEditItem
      id = {props.id}
      edit = {props.edit}
      handleEdit = {props.handleEdit}
      sendEdited = {props.sendEdited}
      disableEdit = {props.disableEdit}
    />

  } else {
    editItem = null
  }
    return (
      <Container className="p-4">
        <Row>
          <Col xs={4}>
          {props.item}
          </Col>
          <Col xs={1}>
            <Button
              variant="danger"
              name={props.id}
              onClick={props.handleDelete}>
              Delete
            </Button>
          </Col>
          <Col xs={1}>
            <Button
              variant="success"
              name={props.id}
              onClick={props.enableEdit}>
              Edit
            </Button>
          </Col>
          {link}
        </Row>
        {editItem}
      </Container>

    )


}
export default AdminItem
