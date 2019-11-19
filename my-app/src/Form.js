import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import {Form,Col,Button, Container} from 'react-bootstrap'
import Axios from 'axios'

const url = 'http://127.0.0.1:3001'

class App extends Component{
  render() {
    return(
      <Container>
        <Form style={{marginTop: 30}}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNIM">
              <Form.Label>NIM</Form.Label>
              <Form.Control required type="text" placeholder="Enter NIM" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid NIM.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="email@address.com" />
            <Form.Control.Feedback type="invalid">
                Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGridPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control required type="text" placeholder="08XXXXXXXXXX" />
            <Form.Control.Feedback type="invalid">
                Please provide a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridDay">
              <Form.Label>Session</Form.Label>
              <Form.Control required as="select">
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTime">
              <Form.Label>Time</Form.Label>
              <Form.Control required as="select">
                <option>8.00</option>
                <option>9.00</option>
                <option>10.00</option>
                <option>11.00</option>
                <option>13.00</option>
                <option>14.00</option>
                <option>15.00</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" placeholder="Please give a brief description" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      
    )
  }
}

export default App