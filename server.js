const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Pool = require('pg').Pool
const app = Express()
const port = 3001

const db = new Pool({
    user: 'qnlgdbqfligteu',
    host: 'ec2-174-129-253-140.compute-1.amazonaws.com',
    database: 'deg6edsh7e8bok',
    password: '7967abc40b08e7042435777e535b05ab8927f1ee045cd912fdb02964d7b17ade',
    port: 5432,
    ssl: true
})

db.connect()
app.use(bodyParser())
app.use(cors())
// get seluruh users
app.get('/',async(req, res)=>{
    const resData = await db.query('select * from users')
    res.json(resData.rows)
})
// get users by id
app.get('/:id',async(req, res)=>{
    const id = req.params.id
    const resData = await db.query(`select * from users where id=${id}`)
    res.json(resData.rows)
})
// menambah data 
app.post('/',async(req,res) => {
    try {
        const {nama, umur, alamat} = req.body
        await db.query(`insert into users(nama, umur, alamat)
         values('${nama}', ${umur}, '${alamat}')`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})
// edit jabatan pegawai
app.put('/',async(req,res)=>{
    const {nama, alamat, jabatan} = req.body
    const id = req.params.id
    
     await db.query(`update users set nama = '${nama}', umur = ${umur}, alamat = '${alamat}' where nama = '${nama}'`)
    res.json('data berhasil diubah')
})
// delete data pegawai by id
app.delete('/:nama',async(req,res)=>{
    const nama = req.params.nama
    await db.query(`DELETE FROM users WHERE nama = ${nama}`)
    res.json('Data terhapus')
})

app.listen(port, ()=>console.log('localhost:3001'))
