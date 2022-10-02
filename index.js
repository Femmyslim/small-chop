require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = 3000

app.use(bodyParser.json())


const connection = mysql.createConnection({
    host     : 'process.env.DATABASE_HOST',
    user     : 'process.env.DATABASE_USER',
    port     : 'process.dev.DATABASE_PORT',
    password : 'process.dev.DATABASE_PASSWORD',
    database : 'process.dev.DATABASE_NAME'
  });
   
  connection.connect()

// table for customers/users details
const users = [
    {
        id: 1,
        firstname: "Qudus",
        othername: "Adedokun",
        occupation: "Jobless",
        age: 18
    },
    
    {
        id: 2,
        firstname: "Qudus",
        othername: "Zubair",
        occupation: "Retired",
        age: 22
    },
    {
        id: 3,
        firstname: "Adedeji",
        othername: "Aminah",
        occupation: "Doctor",
        age: 5
    }
]

//get all customers
app.get('/customers', (req, res) => {
    
    res.status(200).send({
        message: "All customers fetched",
        data: users
    })
})

//create a new customer
app.post('/customer', (req, res) => {
    // id,firstname, othername, occupation age
   
    const fname = req.body.firstname
    const oname = req.body.othername
    const work = req.body.occupation
    const age = req.body.age

    if(!fname || !oname || !work || !age){
        res.status(400).send({
            message:'Please fill all fields'
        })
    }else if(age < 18){
        res.status(400).send({
            message:'You must be 18 and above to register'
    })
    } else {
        //going to create a new user
        const newUsers = {
            id: users.length + 1,
            firstname: fname,
            othername: oname,
            occupation: work,
            age: age

        }

        users.push(newUsers)

        res.status(201).send({
            message: 'Customer created successfully',
            data: newUsers
        })
        }


})

//params query on get bcos get method can only do query and params
app.get('/customer/:id', (req, res) => {

    const userId = req.params.id
    const userData = users.find((user) => user.id == userId)
    if (!userData) { 
        res.status(404).send({
            message: 'User not found'
        })
    } else {
        res.status(200).send({
            message: 'User data fetched',
            data: userData
        })
    }
    

})

app.post("/create/new", (req, res) => {
    // firstname, lastnme, email password
const firstname = req.body.firstname
const lastname = req.body.lastname
const email = req.body.email
const password = req.body.password

if (!firstname || !lastname || !email || !password) {
    res.status(400).send({
        message: `please fill all fields`
    })
} else {
    res.status(201).send({
        message: `Customer created successfully`
    })
}
})

// using params as gets method

app.get('/profile/:email', (req, res) => {
    const usersEmail = req.params.email
    const usersPhone = req.params.usersPhone
    const usersid =req.params.id
    res.status().send({

    })
})

app.listen(port, () =>{
    console.log(`Server running on port: ${port}`)
})
