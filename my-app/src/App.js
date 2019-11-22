import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import {Container, Nav, Jumbotron, Table, Button, Form, Col, Modal} from 'react-bootstrap'
import Axios from 'axios'

const urlHari = 'http://127.0.0.1:3001/jadwal/hari'
const urlJadwal = 'http://127.0.0.1:3001/jadwal'
const urlMahasiswa = 'http://127.0.0.1:3001/mahasiswa'
const urlNim = 'http://127.0.0.1:3001/mahasiswa/nim'
const urlAntrian = 'http://127.0.0.1:3001/antrian'    

class App extends Component{
  state = {
    jadwal:[],
    mahasiswa:[],
    jadwalH:[],
    antrian:[],
    // ============ USER VIEW ==============
    device1:1,
    device2:2,
    showModal:false,
    hari:'Senin',
    jam:'',
    psikolog:'',
    availability:true,
    nama:'',
    nim:'',
    jurusan:'',
    fakultas:'',
    no_tlpn:'',
    deskripsi:'',
    
    // ------- TAMBAH DATA MAHASISWA ------
    mNama:'',
    mNim:'',
    // mFakultas:'',
    // mJurusan:'',
    mNo_tlpn:'',
    mDeskripsi:'',
    // --------------- MODAL --------------
    dNama:'',
    dNim:'',
    // dJurusan:'',
    // dFakultas:'',
    mId:'',
    dNo_tlpn:'',
    dDeskripsi:'',
    // ---------- TAMBAH JADWAL -----------
    jPsikolog:'',
    jJam:'',
    jHari:'',
    showModalJ:false,
    jAvailability:'',
    // --------------- MODAL --------------
    dHari:'',
    dId:'',
    dJam:'',
    dPsikolog:'',
    dAvailability:''
  }

  constructor(props) {
    super(props)
    
    this.handleChangeHari = this.handleChangeHari.bind(this)
    this.handleChangeJHari = this.handleChangeJHari.bind(this)
    this.handleChangeJJam = this.handleChangeJJam.bind(this)
  }
  
  // jalan ketika setelah render
  componentDidMount(){
    this.getDataFromJadwalHari(this.state.hari)
  }
  
  // pilih hari
  handleChangeHari(event) {
    this.setState({hari: event})
    // this.getDataFromJadwalHari()
  }

  // pilih jurusan
  handleChangeJurusan(event) {
    this.setState({dJurusan: event.target.value})
    
  }
  
  // Ganti JHari
  handleChangeJHari(event) {
    this.setState({jHari: event.target.value})
  }
  // Ganti JJam
  handleChangeJJam(event) {
    this.setState({jJam: event.target.value})
  }
  // -----------------------SHOW/HIDE MODAL-----------------------
  showModal = (item) => {
    const {id, hari, jam, psikolog, availability} = item
    this.setState({showModal:true, dId:id, dHari:hari, dJam:jam, dPsikolog:psikolog, dAvailability:availability})
    console.log(this.state)
  }
  hideModal = () => {
    this.setState({showModal:false})
  }

  showModalJ = (item) => {
    const {id, hari, jam, psikolog, availability} = item
    this.setState({showModalJ:true, dId:id, dHari:hari, dJam:jam, dPsikolog:psikolog, dAvailability:availability})
    console.log(this.state)
  }
  hideModalJ = () => {
    this.setState({showModalJ:false})
  }

  // --------------------- DISABLE BUTTON ------------------------
  // approvedSchedule = (id, device) => {
  //   this.setState(availability:false)
  //   this.setState(dId:id)
  //   this.setState(dHari:hari)
  //   this.setState(dJam:jam)
  // }
  // --------------------POST PUT GET DATABASE--------------------
  // Mendapatkan data dari jadwal
  getDataFromJadwalHari = async(a) => {
    try {
    // Axios.get(url)
    // .then(item => console.log(item))
    // .catch(error=> console.log({error}))
      const url = `${urlHari}/${a}`
      const resData = await Axios.get(url)
      this.setState({jadwalH:resData.data})
      this.setState({hari:a})
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  getDataFromJadwal = async() => {
    try {
      // Axios.get(url)
      // .then(item => console.log(item))
      // .catch(error=> console.log({error}))
      const url = `${urlJadwal}`
      const resData = await Axios.get(url)
      this.setState({jadwal:resData.data})
      } catch (error) {
        console.log({error})
        alert('terjadi kesalahan')
      }
  }
  // Mendapatkan data dari tabel mahasiswa
  getDataFromMahasiswa = async() => {
    try {
      // Axios.get(url)
      // .then(item => console.log(item))
      // .catch(error=> console.log({error}))
      const url = `${urlMahasiswa}`
      const resData = await Axios.get(url)
      this.setState({mahasiswa:resData.data})
      } catch (error) {
        console.log({error})
        alert('terjadi kesalahan')
      }
  }
  getDataMahasiswaByNim = async(n) => {
    try {
      // Axios.get(url)
      // .then(item => console.log(item))
      // .catch(error=> console.log({error}))
      const nim = n
      const url = `${urlNim}/${nim}`
      const resData = await Axios.get(url)
      this.setState({mahasiswaN:resData.data})
      } catch (error) {
        console.log({error})
        alert('terjadi kesalahan')
      }
  }
  // Mendapatkan data dari tabel antrian
  getDataFromAntrian = async() => {
    try {
      // Axios.get(url)
      // .then(item => console.log(item))
      // .catch(error=> console.log({error}))
      const url = `${urlAntrian}`
      const resData = await Axios.get(url)
      this.setState({antrian:resData.data})
      } catch (error) {
        console.log({error})
        alert('terjadi kesalahan')
      }
  }  
  // Menambahkan jadwal
  postDataForJadwal = async() => {
    try {
      await Axios.post(urlJadwal, {
        hari:this.state.jHari,
        jam:this.state.jJam,
        psikolog:this.state.jPsikolog,
        availability:true
      })
      this.getDataFromJadwal()
    } catch (err) {
      console.log({err})
      alert('gagal tambah jadwal')
    }
  }
  // Menambah daftar antrian
  postDataAntrian = async(a) => {
    try {
      await Axios.post(urlAntrian, {
        // id_request:Number(this.state.dId),
        hari:this.state.dHari,
        jam:this.state.dJam,
        nama:this.state.dNama,
        nim:this.state.dNim,
        no_tlpn:this.state.dNo_tlpn,
        deskripsi:this.state.dDeskripsi,
        device:a
      })
      this.hideModal()
      // this.getDataFromJadwalHari()
    } catch (err) {
      console.log({err})
      alert('gagal tambah jadwal')
    }
  }
  // Mendaftarkan data mahasiswa untuk sesi konseling
  postDataForMahasiswa = async() => {
    try {
      await Axios.post(urlMahasiswa,{
        nama:this.state.mNama,
        nim:this.state.mNim,
        no_tlpn:this.state.mNo_tlpn
      })
      this.getDataFromMahasiswa()
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  // Mengubah data jadwal
  editDataJadwal = async()=>{
    const {dId, dHari, dJam, dPsikolog, dAvailability} = this.state
    try {
      await Axios.put(`${urlJadwal}/${dId}`, {
        hari:dHari,
        jam:dJam,
        psikolog:dPsikolog,
        availability:dAvailability
      })
      alert('Data berhasil diperbarui')
      this.setState({showModalJ:false})
      this.getDataFromJadwal()
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  // Mengahapus jadwal
  deleteDataJadwal = async() => {
    try {
      const {dId} = this.state
      await Axios.delete(`${urlJadwal}/${dId}`)
      alert('Data Berhasil dihapus')
      this.setState({showModalJ:false})
      this.getDataFromJadwal()
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  deleteAntrian = async(item) => {
    try {
      const id = item
      await Axios.delete(`${urlAntrian}/${id}`)
      alert('Data berhasil dihapus')
      console.log(id)
      this.getDataFromAntrian()
    } catch (err) {
      console.log({err})
      alert('terjadi kesalahan')
    }
  }
  // Menghapus data mahasiswa
  deleteDataMahasiswa = async(item) => {
    try {
      const id = item
      await Axios.delete(`${urlMahasiswa}/${id}`)
      alert('Data berhasil dihapus')
      console.log(id)
      this.getDataFromMahasiswa()
    } catch (err) {
      console.log({err})
      alert('terjadi kesalahan')
    }
  }

  User1 = () => {
    const handleSelect = eventKey => {this.getDataFromJadwalHari(eventKey)}
    
    return(
      
        <Container>         
          <Nav variant="tabs" defaultActiveKey="Senin" onSelect={handleSelect} style={{marginBottom:30, marginTop:10}}>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Senin">Senin</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Selasa">Selasa</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Rabu">Rabu</Nav.Link>
            </Nav.Item >
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Kamis">Kamis</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Jumat">Jumat</Nav.Link>
            </Nav.Item>
          </Nav>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width:80, textAlign: "center"}}>Jam</th>
                <th style={{textAlign: "center"}}>Konselor</th>
                <th style={{textAlign: "center"}}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jadwalH.map((item, index)=>(
                <tr key={index}>
                  {/* <td>{index+1}</td> */}
                  <td>{item.jam}</td>
                  <td>{item.psikolog}</td>
                  <td style={{width:80}}>{item.availability}
                    <Button variant="outline-primary" disabled={this.state.availability} onClick={()=>this.showModal(item)}>Propose</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal */}
          <Modal show={this.state.showModal} onHide={()=>this.hideModal()}>
            <Modal.Header closeButton>
              <Modal.Title>Pengajuan Jadwal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{marginTop: 30}}>
                  <Form.Group controlId="formGridNama">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNama:event.target.value})} 
                    style={{marginBottom:10}} required type="text" placeholder="Enter Name" />
                  </Form.Group>
                  <Form.Group controlId="formGridNim">
                    <Form.Label>NIM</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNim:event.target.value})} 
                    style={{marginBottom:10}} required type="text" placeholder="Enter NIM" />
                  </Form.Group>
                  <Form.Group controlId="formGridNotelp">
                    <Form.Label>No. Hp</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNo_tlpn:event.target.value})} 
                    style={{marginBottom:10}} required type="text" placeholder="Enter Phone Number" />
                  </Form.Group>
                  <Form.Group controlId="formGridDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required type="text" onChange={(event)=>this.setState({dDeskripsi:event.target.value})} 
                    style={{marginBottom:10}} placeholder="Please give a brief description" />
                  </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={()=>this.postDataAntrian(1)}>
                  Submit
              </Button>
            </Modal.Footer>
          </Modal>

        </Container>
    )
  }

  User2 = () => {
    const handleSelect = eventKey => {this.getDataFromJadwalHari(eventKey)}
    
    return(
      
        <Container>         
          <Nav variant="tabs" defaultActiveKey="Senin" onSelect={handleSelect} style={{marginBottom:30, marginTop:10}}>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Senin">Senin</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Selasa">Selasa</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Rabu">Rabu</Nav.Link>
            </Nav.Item >
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Kamis">Kamis</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Jumat">Jumat</Nav.Link>
            </Nav.Item>
          </Nav>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width:80, textAlign: "center"}}>Jam</th>
                <th style={{textAlign: "center"}}>Konselor</th>
                <th style={{textAlign: "center"}}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jadwalH.map((item, index)=>(
                <tr key={index}>
                  {/* <td>{index+1}</td> */}
                  <td>{item.jam}</td>
                  <td>{item.psikolog}</td>
                  <td style={{width:80}}>{item.availability}
                    <Button variant="outline-primary" onClick={()=>this.showModal(item)}>Propose</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal */}
          <Modal show={this.state.showModal} onHide={()=>this.hideModal()}>
            <Modal.Header closeButton>
              <Modal.Title>Pengajuan Jadwal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{marginTop: 30}}>
                  <Form.Group controlId="formGridNama">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNama:event.target.value})} 
                    style={{marginBottom:10}} required type="text" placeholder="Enter Name" />
                  </Form.Group>
                  <Form.Group controlId="formGridNim">
                    <Form.Label>NIM</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNim:event.target.value})} 
                    style={{marginBottom:10}} required type="text" placeholder="Enter NIM" />
                  </Form.Group>
                  <Form.Group controlId="formGridNotelp">
                    <Form.Label>No. Hp</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNo_tlpn:event.target.value})} 
                    style={{marginBottom:10}} required type="text" placeholder="Enter Phone Number" />
                  </Form.Group>
                  <Form.Group controlId="formGridDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required type="text" onChange={(event)=>this.setState({dDeskripsi:event.target.value})} 
                    style={{marginBottom:10}} placeholder="Please give a brief description" />
                  </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={()=>this.postDataAntrian(2)}>
                  Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
    )    
  }
  
  Antrian = () => {
    
    return (
      <Container>
        
        <Table striped bordered hover style={{marginTop:30}}>
          <thead>
            <tr>
            {/* nama, nim, jurusan, approveid, deskripsi */}
              <th style={{width:10, textAlign: "center"}}>#</th>
              <th style={{width:20, textAlign: "center"}}>Hari</th>
              <th style={{width:20, textAlign: "center"}}>Jam</th>
              <th style={{width:200, textAlign: "center"}}>Nama</th>
              <th style={{width:40, textAlign: "center"}}>NIM</th>
              <th style={{width:60, textAlign: "center"}}>Kontak</th>
              <th style={{textAlign: "center"}}>Deskripsi</th>
              <th style={{textAlign: "center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.antrian.map((item, index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.hari}</td>
                <td>{item.jam}</td>
                <td>{item.nama}</td>
                <td>{item.nim}</td>
                <td>{item.no_tlpn}</td>
                <td>{item.deskripsi}</td>
                <td style={{width:80, textAlign:"center"}}>
                  <Button variant="success" size="sm" onClick={()=>this.approveSchedule(item.id, item.device)}>Approve</Button>
                  <Button style={{marginTop:5}}variant="outline-danger" size="sm" onClick={()=>this.deleteAntrian(item.id)}>Dismiss</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }

  TambahJadwal = () => {
    
    return (
      <Container style={{marginTop:20}}>
        <Form>
          <Form.Group controlId="formGridPsikolog">
            <Form.Label>Conselor's Name</Form.Label>
            <Form.Control 
              onChange={(event)=>this.setState({jPsikolog:event.target.value})}
              placeholder="Enter Conselor's Name" />
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Day</Form.Label>
            <Form.Control as="select" select value={this.state.jHari} onChange={this.handleChangeJHari}>
              <option value="">Choose...</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>                
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Session</Form.Label>
            <Form.Control as="select" select value={this.state.jJam} onChange={this.handleChangeJJam}>
              <option value="">Choose...</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>        
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>                
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>        
              <option value="15:00">15:00</option>
            </Form.Control>
          </Form.Group>

          </Form.Row>

          <Button onClick={()=>this.postDataForJadwal()} variant="primary" type="submit">
          ADD
          </Button>
          </Form>
        
        {/* Tabel Jadwal */}
        <Table striped bordered hover style={{marginTop:20}}>
          <thead>
            <tr>
              <th>Hari</th>
              <th>Jam</th>
              <th>Psikolog</th>
              {/* <th>Availability</th> */}
              <th>Ubah Jadwal</th>
            </tr>
          </thead>
          <tbody>
           {this.state.jadwal.map((item, index)=>(
             <tr key={index}>
              <td>{item.hari}</td>
              <td>{item.jam}</td>
              <td>{item.psikolog}</td>
              <td style={{width:50}}>
                {item.availability}
                <Button variant='warning' onClick={()=>this.showModalJ(item)}>Edit/Delete</Button>
              </td>
           </tr>
           ))}
          </tbody>
        </Table>

        {/* Modal */}

        <Modal show={this.state.showModalJ} onHide={()=>this.hideModalJ()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Jadwal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formGridPsikolog">
            <Form.Label>Conselor's Name</Form.Label>
            <Form.Control 
              onChange={(event)=>this.setState({dPsikolog:event.target.value})}
              placeholder="Enter Conselor's Name" />
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Day</Form.Label>
            <Form.Control as="select" select value={this.state.dHari} onChange={(event)=>this.setState({dHari: event.target.value})}>
              <option value="">Choose...</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>                
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Session</Form.Label>
            <Form.Control as="select" select value={this.state.dJam} onChange={(event)=>this.setState({dJam: event.target.value})}>
              <option value="">Choose...</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>        
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>                
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>        
              <option value="15:00">15:00</option>
            </Form.Control>
          </Form.Group>

          </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>this.deleteDataJadwal()}>
            Delete
          </Button>
          <Button variant="primary" onClick={()=>this.editDataJadwal()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    )
  }

  TambahMahasiswa = () => {
    return (
      <Container style={{marginTop:20}}>
        <Form>
          <Form.Group controlId="formGridNama">
            <Form.Label>Nama mahasiswa</Form.Label>
            <Form.Control 
              onChange={(event)=>this.setState({mNama:event.target.value})}
              placeholder="Enter Student's Name" />
          </Form.Group>
          <Form.Group controlId="formGridNim">
            <Form.Label>NIM</Form.Label>
            <Form.Control 
              onChange={(event)=>this.setState({mNim:event.target.value})}
              placeholder="NIM" />
          </Form.Group>
          <Form.Group controlId="formGridNo_tlpn">
            <Form.Label>No WA</Form.Label>
            <Form.Control 
              onChange={(event)=>this.setState({mNo_tlpn:event.target.value})}
              placeholder="Phone number" />
          </Form.Group>

          <Button onClick={()=>this.postDataForMahasiswa()} variant="primary" type="submit">
          ADD
          </Button>
          </Form>
        
        {/* Tabel Jadwal */}
        <Table striped bordered hover style={{marginTop:20}}>
          <thead>
            <tr style={{textAlign:"center"}}>
              <th style={{width:20}}>#</th>
              <th>Nama</th>
              <th>NIM</th>
              <th>No. HP</th>
              <th style={{width:100}}>Hapus Data</th>
            </tr>
          </thead>
          <tbody>
           {this.state.mahasiswa.map((item, index)=>(
             <tr key={index}>
              <td>{index+1}</td>
              <td>{item.nama}</td>
              <td>{item.nim}</td>
              <td>{item.no_tlpn}</td>
              <td style={{width:80, textAlign:"center"}}>
                <Button variant='danger' onClick={()=>this.deleteDataMahasiswa(item.id)}>Delete</Button>
              </td>
           </tr>
           ))}
          </tbody>
        </Table>
      </Container>
    )
  }
  Admin = () => {
    return(
      <Router>
        <Container>
        
        <Nav variant="tabs" defaultActiveKey="antrian">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/admin" eventKey="antrian">Antrian</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={()=>this.getDataFromJadwal()}>
            <Nav.Link as={NavLink} to="/tambahjadwal" eventKey="tambahjadwal">Tambah Jadwal</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={()=>this.getDataFromMahasiswa()}>
            <Nav.Link as={NavLink} to="/tambahmahasiswa" eventKey="tambahmahasiswa">Tambah Data Mahasiswa</Nav.Link>
          </Nav.Item>
        </Nav>

        <Switch>
          <Route exact path="/admin">
            <this.Antrian />
          </Route>
          <Route path="/tambahjadwal">
            <this.TambahJadwal />
          </Route>
          <Route path="/tambahmahasiswa">
            <this.TambahMahasiswa />
          </Route>
        </Switch>

        </Container>
      </Router>
    )
  }
  
  render(){
    
    return (
      <Router>
        <Container>
          <Nav variant="pills" defaultActiveKey="user1" style={{marginTop:10}}>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user1" eventKey="user1">User1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user2" eventKey="user2">User2</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.getDataFromAntrian()}>
              <Nav.Link as={NavLink} to="/admin" eventKey="admin">Admin</Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Jumbotron style={{marginTop:10}}>
            <h1>Selamat Datang di Layanan BK-Online</h1>
            <p>
              Berikut ditampilkan jadwal per hari yang akan diperbarui tiap minggu. Silahkan melakukan pengajuan jadwal 
              sesuai ketersediaan. 
            </p>
          </Jumbotron>
          
          <Switch>
            <Route exact path="/">
              <this.User1 />
            </Route>
            <Route path="/user1">
              <this.User1 />
            </Route>
            <Route path="/user2">
              <this.User2 />
            </Route>
            <Route path="/admin">
              <this.Admin />
            </Route>
          </Switch>

        </Container>
     </Router>
    )
  }
}

export default App