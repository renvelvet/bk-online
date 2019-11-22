const express = require('express')
const app = express()

const Pool = require('pg').Pool
const db = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: true
})

db.connect()
// get seluruh mahasiswa
app.get('/mahasiswa',async(req, res)=>{
    const resData = await db.query('select * from mahasiswa order by nama')
    res.json(resData.rows)
})

// get mahasiswa by id
app.get('/mahasiswa/:id',async(req, res)=>{
    const id = req.params.id
    const resData = await db.query(`select * from mahasiswa where id=${id}`)
    res.json(resData.rows) 
})
// get mahasiswa by nim
app.get('/mahasiswa/nim/:nim',async(req, res)=>{
    const nim = req.params.nim
    const resData = await db.query(`select * from mahasiswa where nim='${nim}'`)
    res.json(resData.rows) 
})
// menambah data 
app.post('/mahasiswa',async(req,res) => {
    try {
        const {nama, nim, no_tlpn} = req.body
        await db.query(`insert into mahasiswa(nama, nim, no_tlpn)
         values('${nama}', '${nim}', '${no_tlpn}')`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})

// delete mahasiswa by id
app.delete('/mahasiswa/:id',async(req,res)=>{
    const id = req.params.id
    await db.query(`DELETE FROM mahasiswa WHERE id = ${id}`)
    res.json('Data terhapus')
})

module.exports = app