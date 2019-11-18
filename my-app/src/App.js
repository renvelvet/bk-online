import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import {Container, Nav} from 'react-bootstrap'
import Axios from 'axios'

const url = 'http://127.0.0.1:3001'

class App extends Component{
  constructor() {
    super()
  }

  User1 = () => {

  }

  User2 = () => {

  }
  
  Admin = () => {

  }
  
  render(){
    return (
      <Router>
        <Container>
          <Nav variant="pills" defaultActiveKey="/" style={{marginTop:10}}>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user1" activeClassName="selected" eventKey="user1">User1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user2" activeClassName="selected" eventKey="user2" title="user2">User2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/admin" activeClassName="selected" href="/" title="admin">Admin</Nav.Link>
            </Nav.Item>
          </Nav>

          <Switch>
            <Route path="/user1">
              <User1 />
            </Route>
            <Route path="/user2">
              <User2 />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </Container>
     </Router>
    )
  }
}

export default App