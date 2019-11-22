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
// db.connect()
// get seluruh jadwal
app.get('/jadwal',async(req, res)=>{
    const resData = await db.query('select * from jadwal order by id')
    res.json(resData.rows)
})

// get jadwal by hari
app.get('/jadwal/hari/:hari',async(req, res)=>{
    const hari = req.params.hari
    const resData = await db.query(`select * from jadwal where hari='${hari}' order by id`)
    res.json(resData.rows)
})

// menambah jadwal
app.post('/jadwal',async(req,res) => {
    try {
        const {hari, jam, psikolog, availability} = req.body
        await db.query(`insert into jadwal(hari, jam, psikolog, availability)
         values('${hari}', '${jam}', '${psikolog}', ${availability})`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})


// edit jadwal
app.put('/jadwal/:id',async(req,res)=>{
    const {hari, jam, psikolog, availability} = req.body
    const id = req.params.id
    
    await db.query(`update jadwal set hari = '${hari}', jam = '${jam}', psikolog = '${psikolog}', availability = ${availability}
    where id = ${id}`)
    res.json('data berhasil diubah')
})

// delete jadwal by id
app.delete('/jadwal/:id',async(req,res)=>{
    const id = req.params.id
        
    await db.query(`DELETE FROM jadwal WHERE id = ${id}`)
    res.json('Data terhapus')
})

module.exports = app