const express = require("express")
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require("mongoose");
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 1989

const path = require("path")

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/art-app',
    { useNewUrlParser: true },
    (err) => {
    if (err) throw err;
    console.log("Connected to the database")
    }
) 

app.use('/api', expressJwt({secret: process.env.SECRET || "chocolate"}))
app.use('/api/art', require('./routes/art'))
app.use('/auth', require("./routes/auth"))

app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({message: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
})