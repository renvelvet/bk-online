const express = require('express')
const app = express()
const Pool = require('pg').Pool

const db = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: false
})

db.connect()
// get seluruh mahasiswa
app.get('/mahasiswa',async(req, res)=>{
    const resData = await db.query('select * from mahasiswa')
    res.json(resData.rows)
})

// get mahasiswa by id
app.get('/mahasiswa/:id_registrasi',async(req, res)=>{
    const id_registrasi = req.params.id_registrasi
    const resData = await db.query(`select * from mahasiswa where id_registrasi=${id_registrasi}`)
    res.json(resData.rows)
})

// menambah data 
app.post('/mahasiswa',async(req,res) => {
    try {
        const id_registrasi= req.query.id_registrasi;
        const {nama, nim, fakultas, jurusan, no_tlpn, mbti} = req.body
        await db.query(`insert into mahasiswa(id_registrasi, nama, nim, fakultas, jurusan, no_telepon, mbti)
         values('${id_registrasi}','${nama}', '${nim}', '${fakultas}, '${jurusan}', ${no_telepon}, '${mbti}')`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})

// edit mahasiswa by id
app.put('/mahasiswa/:id_registrasi',async(req,res)=>{
    const {nama, nim, fakultas, jurusan, no_tlpn, mbti} = req.body
    const id_registrasi = req.params.id_registrasi
    
    await db.query(`update mahasiswa set nama = '${nama}', nim = ${nim}, fakultas = ${fakultas}, jurusan = '${jurusan}', no_tlpn = ${no_tlpn}, mbti = '${mbti}' 
    where id = ${id}`)
    res.json('data berhasil diubah')
})

// delete mahasiswa by id
app.delete('/mahasiswa/:id_registrasi',async(req,res)=>{
    const id_registrasi = req.params.id_registrasi
    await db.query(`DELETE FROM mahasiswa WHERE id_registrasi = ${id_registrasi}`)
    res.json('Data terhapus')
})

module.exports = app