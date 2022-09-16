const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload());
app.use(routes)

module.exports = app
