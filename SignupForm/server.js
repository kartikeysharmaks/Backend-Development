const express = require('express');
const app = express();
let user = [];

app.listen(3000, () =>{
    console.log('Server is running at Port 3000');
});

app.use(express.json());

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter.route("/").get(getUser).post(postUser).patch(updateUser).delete(deleteUser);
authRouter.route("/signup").get(getSignup).post(postSignup);

function getUser(req, res){
    res.send(user);
}

function postUser(req, res){
    console.log(req.body);
    user = req.body;
    res.json({
        user: req.body,
        message : "data recieved succesfully"
    });
}

function updateUser(req, res){
    console.log(req.body);
    for(key in req.body){
        user[key] = req.body[key];
    }
    res.json({
        user : req.body,
        message : "data updated successfully"
    });
}

function deleteUser(req, res){
    user = {};
    res.json({
        message : "data deleted successfully"
    });
}

function getSignup(req, res){
    res.sendFile('/public/index.html',{root:__dirname});
}

function postSignup(req, res){
    let data = req.body;
    console.log(data);
    res.json({
        message : "user signed up",
        data : data
    });
}