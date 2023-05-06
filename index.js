const express = require('express')
const app = express()
require('dotenv').config()
require('./models/config')
const bodyParser = require('body-parser')
const router = require('./router/userRoutes')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
  app.use('/',router)

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on port : ${process.env.PORT}`)
})