const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("server is running at PORT 3000");
});

//another middleware function
app.use(express.json());

//mini app - router
const router = express.Router();

app.use("/user", router);

//middleware functions to be executed are passed to the the get method
router.route("/signup").get(middleware1,getSignup,middleware2);

//middleware functions having three parameters i.e. request, response and next(next function to be called)

//here next function to be called is getSignup
function middleware1(req, res, next){
    console.log("Middleware1 is executed");
    next();
}

//here next function to be called is middleware2
function getSignup(req, res, next){
    console.log("getSignup is called");
    next();
}

//this is the last function therefore has no next parameter
function middleware2(req, res ){
    console.log("Middleware2 is executed");
    res.send("<h1>Hello World</h1>");
}