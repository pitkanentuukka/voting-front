import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select'


/**
*Form for candidate name & number
* props: partyName, handleChange, handleSubmit
*/
function CandidateForm(props) {

  let options = props.districts.map(item => {
    item.label = item.district
    item.value = item.id
    return item
  })

  return (
    <Container className="p-1">

      <h1>hello candidate!</h1>
      <Container className="p-2">
        <h2> party: {props.partyName}</h2>
        <form>
          <Row>
            <Col xs="2">
              Your name:
            </Col>
            <Col>
              <input
                type='text'
                name='name'
                onChange={props.handleChange}
                placeholder='your name'
                required
              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your number:
            </Col>
            <Col>
              <input
                type='text'
                name='number'
                onChange={props.handleChange}
                placeholder='your number'
                required
              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your email:
            </Col>
            <Col>
              <input
                type='text'
                name='email'
                onChange={props.handleChange}
                placeholder='your email'
                required
              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your facebook:
            </Col>
            <Col>
              <input
                type='text'
                name='facebook'
                onChange={props.handleChange}
                placeholder='your facebook'

              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your twitter:
            </Col>
            <Col>
              <input
                type='text'
                name='twitter'
                onChange={props.handleChange}
                placeholder='your twitter'

              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your website:
            </Col>
            <Col>
              <input
                type='text'
                name='website'
                onChange={props.handleChange}
                placeholder='your website'

              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your LinkedIn:
            </Col>
            <Col>
              <input
                type='text'
                name='linkedin'
                onChange={props.handleChange}
                placeholder='your LinkedIn'

              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your tiktok:
            </Col>
            <Col>
              <input
                type='text'
                name='tiktok'
                onChange={props.handleChange}
                placeholder='your tiktok'

              />
            </Col>

          </Row>
          <Row>
            <Col xs="2">
              Your instagram:
            </Col>
            <Col>
              <input
                type='text'
                name='instagram'
                onChange={props.handleChange}
                placeholder='your instagram'

              />
            </Col>

          </Row>

          <Row>
            <Col xs="2">
              District:
            </Col>
            <Col xs="3">
              <Select
                options={options}
                onChange={props.handleDistrictChange}

              />

            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={props.handleSubmit}>submit</Button>

            </Col>
          </Row>
        </form>
      </Container>

    </Container>




  )
}


export default CandidateForm
