import React,{Component} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {Link} from 'react-router-dom'
import Create from './Create'
import {InputGroup, FormControl, Container, Button, Navbar, Form, CardDeck, Card} from 'react-bootstrap'
import Axios from 'axios'

const url = 'http://127.0.0.1:3001'

class App extends Component{
  // state empty tabel
  state = {
    data:[],
    username:'',
    password:'',
    // untuk detail
    dUsername:'',
    dPassword:''
  }
  constructor(props){
    super(props)
    // this.getDataFromApi()
  }

  render(){
    return (
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Layanan BK
          </Navbar.Brand>
          <Navbar.Toggle />
          <Form inline style={{marginLeft: 160}}>
            <InputGroup style={{marginRight: 4}}>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{width: 150}} 
                placeholder="NIM/NIP"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="text" placeholder="Kata sandi" className=" mr-sm-2" style={{width: 150}}/>
              <Button type="submit" style={{marginRight: 10}}>Login</Button>
              <Navbar.Text className="justify-content-end">
                <Link to="/Create">or Create Account?</Link>
              </Navbar.Text>
            </InputGroup>
          </Form>
        </Navbar>
        <Jumbotron>
          <h1>Selamat Datang di Layanan BK dalam Jaringan!</h1>
          <p>
            Temukan konten psikologi yang telah dikurasi oleh tim kami!
          </p>
          <p>
            <Button variant="primary">See more>></Button>
          </p>
        </Jumbotron>
        <CardDeck>
          <Card>
            <Card.Img variant="top" src="https://ca-times.brightspotcdn.com/dims4/default/3bdc647/2147483647/strip/true/crop/3200x1768+0+0/resize/840x464!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F7c%2F1d%2Fc11c1b0e46cab3e7d14be3663c1e%2Fla-et-mn-tiff-movies-02.jpg" />
            <Card.Body>
              <Card.Title>JOKER dan Seberapa Jauh Kita Memahami Manusia</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 19 October 2019</small>
            </Card.Footer>
          </Card>x
          <Card>
            <Card.Img variant="top" src="https://econsultancy.imgix.net/content/uploads/2018/09/04155306/social-media-image-.jpg" />
            <Card.Body>
              <Card.Title>Mengapa Kita Sering Curhat di Media Sosial?</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 2 November 2019</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://www.therecoveryvillage.com/wp-content/uploads/2019/07/Fear-vs-Phobia.jpg" />
            <Card.Body>
              <Card.Title>Mengenal Lebih Dalam Mengenai Fobia</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 8 November 2019</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Container>
    )
  }
}

export default App
