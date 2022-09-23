const express = require("express")
const bodyParser = require("body-parser")
const app = express
const port = 3000

app.use(body-bodyParser.json())

app.listen(port, (req,res) =>{
    console.log(`Server running on port: ${port}`)
})

app.post("/create", (req, res) => {
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