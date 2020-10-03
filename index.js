// C.S.3320 Internet Software Development
// Due Date: 10/03/2020
// Author: Frederick Jamar flj5

// Javascript file for basic RESTApi implementation of 
// ecommerce web application.

const { DH_NOT_SUITABLE_GENERATOR } = require('constants');
const express = require('express');
const { get } = require('http');
const app = express();
app.use(express.json());

let users = [];
let shoppingCarts = [];
let storeItems = [];
let userCount = 0;
let cartCount = 0;
let storeItemCount = 0;

// Placeholder store items to be accessed later
const instoreItemOne = {
    "storeItemId": storeItemCount,
    "itemName": "RTX 3090",
    "itemDescription": "Your dream GPU"
}
storeItems.push(instoreItemOne);
storeItemCount++;

const instoreItemTwo = {
    "storeItemId": storeItemCount,
    "itemName": "Cat food",
    "itemDescription": "For your cat"
}
storeItems.push(instoreItemTwo);
storeItemCount++;

const instoreItemThree = {
    "storeItemId": storeItemCount,
    "itemName": "Milk",
    "itemDescription": "Comes from cows"
}
storeItems.push(instoreItemThree);
storeItemCount++;

const instoreItemFour = {
    "storeItemId": storeItemCount,
    "itemName": "T-shirt",
    "itemDescription": "Something you wear"
}
storeItems.push(instoreItemFour);
storeItemCount++;

const instoreItemFive = {
    "storeItemId": storeItemCount,
    "itemName": "Cat toy",
    "itemDescription": "Is in fact wet"
}
storeItems.push(instoreItemFive);
storeItemCount++;


// Test shopping cart made for test user
let newShoppingCart = {};
newShoppingCart.cartId = cartCount;
newShoppingCart.cartItems = [];
shoppingCarts.push(newShoppingCart);


// Test user to show in client
const singleUser = {
    "userId": userCount,
    "firstName": "Luke",
    "lastName": "Jamar",
    "email": "lukejamar@email.com",
    "cart": shoppingCarts[cartCount]
};

users.push(singleUser);
userCount++;
cartCount++;

// GET user by ID funtion
app.get('/user/:userId', (req, res) => {
    const foundUser = users.find((user) => {
        return user.userId == req.params.userId
    });    
    res.send(foundUser ? foundUser: 404);

});


// POST new user: gets new user from the client body
app.post('/user', (req, res) => {

    //Before a new user is made a shopping cart is made for them
    let newShoppingCart = {};
    newShoppingCart.cartId = cartCount;
    newShoppingCart.cartItems = [];
    shoppingCarts.push(newShoppingCart);

    // The new user is written here
    let newUser = {};

    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.cart = shoppingCarts[cartCount];  // This is so user can access the cart
    newUser.userId = userCount;

    users.push(newUser);
    userCount++;
    cartCount++;
    res.send(newUser);
});

// GET a cart from a particular user ID
app.get('/user/:userId/cart', (req, res) => {
    const foundUser = users.find((user) => {
        return user.userId == req.params.userId
    }); 

    // Returns cart for given ID and 404 error otherwise
    if (foundUser) {
        res.send(users[parseInt(req.params.userId)].cart);
    } else {
        res.send(404)
    }
 
});


// DELETE clears the cart of a particular user
app.delete('/user/del/:userId/cart', (req, res) => {
    // Find correct user to clear cart
    const foundUser = users.find((user) => {
        return user.userId == req.params.userId
    });

    // check if user is found and if cart is empty
    if (foundUser) {
        if (users[parseInt(req.params.userId)].cart.cartItems) {
            users[parseInt(req.params.userId)].cart.cartItems = [];
            res.send(users[parseInt(req.params.userId)]);
        }
    } else {
        res.send(404);
    }

});

// POST storeItem into Cart array for specific user
app.post('/cart/:cartId/cartItem', (req, res) => {
    // Find the cart with the right Id
    const foundCart = shoppingCarts.find((cart) => {
        return cart.cartId == req.params.cartId
    });   

    if (foundCart) {
        let newCartItem = {};
        newCartItem.itemId = req.body.itemId;
        newCartItem.quantity = req.body.quantity;
        shoppingCarts[parseInt(req.params.cartId)].cartItems.push(newCartItem);
        res.send(shoppingCarts[parseInt(req.params.cartId)]);
    } else {
        res.send(404);
    }

});   

// DELETE item from a cart
app.delete('/cart/:cartId/cartItem/:cartItemId', (req, res) => {
    // Find if cartId exists
    const foundCart = shoppingCarts.find((cart) => {
        return cart.cartId == req.params.cartId
    });
    // Check index of cartItemId
    const fndCartItemIndex = 
    shoppingCarts[parseInt(req.params.cartId)].cartItems.indexOf(req.params.cartItemId);

    if (foundCart) {
        const foundCartItem = 
        shoppingCarts[parseInt(req.params.cartId)].cartItems.splice(fndCartItemIndex,1);
        res.send(foundCartItem ? foundCartItem: 404);
    } else {
        res.send(404);
    }
});

// GET Store Items from store Item IDs
app.get('/storeItem/:storeItemId', (req, res) => {
    const foundStoreItem = storeItems.find((item) => {
        return item.storeItemId == req.params.storeItemId
    });    

    res.send(foundStoreItem ? foundStoreItem: 404 );
});

// GET store item from querey parameter
app.get('/storeItem', (req, res) => {
    let foundItems = storeItems;
    if (req.query.itemName) {
        foundItems = storeItems.filter( (item) => {
            return item.itemName.includes(req.query.itemName);
        })
    }
    res.send(foundItems);
});

app.listen(8080);