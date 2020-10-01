// C.S.3320 Internet Software Development
// Due Date: 10/03/2020
// Author: Frederick Jamar flj5

// Javascript file for basic RESTApi implementation of 
// ecommerce web application.

const express = require('express');
const { get } = require('http');
const app = express();
app.use(express.json());

let users = [];
let storeItems = [];
let userCount = 0;
let cartCount = 0;

const singleUser = {
    "userId": users.length,
    "firstName": "Luke",
    "lastName": "Jamar",
    "email": "lukejamar@email.com",
    "cart": cart = [],
};

const instoreItem = {
    "storeItemId": storeItems.length,


}

users.push(singleUser);

// GET all users (delete before publishing)
app.get('/user', (req, res) => {
    res.send(users)
})

// GET user by ID funtion
app.get('/user/:userId', (req, res) => {
    const foundUser = users.find((user) => {
        return user.userId == req.params.userId
    })    

    res.send(foundUser);

})

// POST new user 
app.post('/user', (req, res) => {
    let newUser = {};

    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.cart = [];
    newUser.userId = users.length;

    users.push(newUser);
    res.send(newUser);
})

// let garage = {};
// garage.insert = "tabloo";

app.listen(8080);