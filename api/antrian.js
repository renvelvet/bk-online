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
// get seluruh antrian
app.get('/antrian',async(req, res)=>{
    const resData = await db.query('select * from antrian')
    res.json(resData.rows)
})

// menambah antrian
app.post('/antrian',async(req,res) => {
    try {
        const id_request= req.query.id_request;
        const {hari, jam, nama, nim, jurusan, id_request, deskripsi} = req.body
        const id_regist= await db.query(`select id_regist from mahasiswa where nim=${nim}`)
        await db.query(`insert into antrian(id_request, id_regist, hari, jam, deskripsi)
         values('${id_request}', '${id_regist}', '${hari}', '${jam}', '${deskripsi}')`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})

// edit antrian
// app.put('/',async(req,res)=>{
//     const {nama, alamat, jabatan} = req.body
//     const id = req.params.id
    
//      await db.query(`update users set nama = '${nama}', umur = ${umur}, alamat = '${alamat}' where nama = '${nama}'`)
//     res.json('data berhasil diubah')
// })


// delete antrian by id
/*app.delete('/antrian/:id_request',async(req,res)=>{
    const id_request = req.params.id_request
    await db.query(`DELETE FROM antrian WHERE id_request = ${id_request}`)
    res.json('Data terhapus')
})*/

module.exports = app