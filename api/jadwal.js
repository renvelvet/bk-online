// referensi psikolog => https://www.ibunda.id/psikolog

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
// get seluruh jadwal
app.get('/jadwal',async(req, res)=>{
    const resData = await db.query('select * from jadwal')
    res.json(resData.rows)
})

// get jadwal by id
// app.get('/jadwal/:id',async(req, res)=>{
//     const id = req.params.id
//     const resData = await db.query(`select * from jadwal where id=${id}`)
//     res.json(resData.rows)
// })

// get jadwal by hari
app.get('/jadwal/hari/:hari',async(req, res)=>{
    const hari = req.params.hari
    const resData = await db.query(`select * from jadwal where hari='${hari}'`)
    res.json(resData.rows)
})

// menambah jadwal
app.post('/jadwal',async(req,res) => {
    try {
        const {hari, jam, psikolog, availability, approveid} = req.body
        await db.query(`insert into jadwal(hari, jam, psikolog, availability, approveid)
         values('${hari}', ${jam}, '${psikolog}', ${availability}, ${approveid})`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})


// edit jadwal
app.put('/jadwal/hari/:hari/jam/:jam',async(req,res)=>{
    const {psikolog, availability, approveid} = req.body
    const hari = req.params.hari
    const jam = req.params.jam
    
    await db.query(`update jadwal set psikolog = '${psikolog}', availability = ${availability}, approveid = ${approveid}
    where hari = '${hari}' and jam = '${jam}'`)
    res.json('data berhasil diubah')
})

// delete jadwal by id
/*app.delete('/jadwal/:id',async(req,res)=>{
    const id = req.params.id
    await db.query(`DELETE FROM jadwal WHERE id = ${id}`)
    res.json('Data terhapus')*/
})

module.exports = app