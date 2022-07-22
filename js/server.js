// 1 initialize npm and install all dependencies
// express, dotenv, cors, mongodb, ejs, nodemon (--save -dev)

// 2 require dependencies in server dependencies

// 3 delare variables

// create gitignore file and push to github

// 4 connect to MongoDB - add connection string to .env file

// 5 create port
// test Mongo and Port Connection

// 6 set middleware

// 7 create gitignore file

// 8 create public and views folders add main.js and style.css to public and index.ejs to views

// 9 add content to main.js, style.css, and index.ejs

//10 create heroku repo (config vars) for env 
//heroku login
//heroku create app
//echo "web: node server.js> Procfile
// git add . 
// git commit -m "changes"
// git push heroku main

const express = require('express')
const app = express()
const cors = require("cors")
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'fragarance-products',
    collection

//connecting to the database
MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log("Connected to the database")
        db = client.db(dbName)
        collection = db.collection("fragrance-safe-products")
})

// returning ejs/html to the root
app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}) 

// middleware
app.set("view engine", "ejs") //helps parse ejs
app.use(express.static('public') ) //tells where to go for static files HTML/CSS
app.use(express.urlencoded ( {extended:true} ) ) //how to handle URLs
app.use(express.json() ) //allows use of JSON for objects
app.use(cors() ) //prevent cross object requests


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})