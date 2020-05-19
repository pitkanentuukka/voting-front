import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/**
*props: handleEdit, sendEdited, disableEdit, id, edit
*/
function AdminEditItem (props) {
  return (
    <Row>
      <Col xs={4}>
        <input
          style={{width:'100%'}}
          type='text'
          name={props.id}
          value={props.edit}
          onChange={props.handleEdit}>
        </input>
        </Col>
      <Col xs={1}>
        <Button
          name={props.id}
          onClick={props.sendEdited}>
          Submit
        </Button>
      </Col>
      <Col>
        <Button xs={1}
          variant="secondary"
          name={props.id}
          onClick={props.disableEdit}>
          Cancel
        </Button>
      </Col>
    </Row>
  )
}
export default AdminEditItem
