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

   return  (
     <Container  className="p-1">

       <h1>hello candidate!</h1>
         <Container  className="p-2">
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
