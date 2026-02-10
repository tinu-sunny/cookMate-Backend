require('dotenv').config()
const express = require('express')
require('./config/db')
const router = require('./router/route')
const cors = require('cors')


const server = express()


server.use(cors())
server.use(express.json())
server.use(router)

const PORT = 3000||process.env.PORT
server.listen(PORT,()=>{
    console.log("server on the port ",PORT);
    
})