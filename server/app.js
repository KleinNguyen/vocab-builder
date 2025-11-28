// import express library
const express = require('express')
const app = express()

// import mongoose library and connect to db
const mongoose = require('mongoose')
const db_local = "mongodb://localhost:27017/vocab-learning"
// const db_cloud = ""

mongoose.connect(db_local)
    .then(() => console.log('Connect to DB succeed'))
    .catch((err)=> console.error('Connect to DB failed') + err)

app.use(express.json())


//import cors library for FE to call API
const cors = require('cors')
app.use(cors())


const vocabRouter = require('./api/routes/vocabRoute')
vocabRouter(app)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Server is running http://localhost:'+port)
})
