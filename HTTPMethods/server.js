const express = require('express');
const app = express();

let user = {};

app.use(express.json());

app.listen(3000, (req,res) => {
    console.log("App server is running at port 3000");
});

//get method => get is used to get data from backend to display it on frontend

app.get("/user", (req,res) => {
    res.send(user);
});

//post method => post is used to send data from frontend to backend

app.post("/user", (req,res) => {
    console.log(req.body);
    user = req.body;
    res.json({
        user: req.body,
        message : "data recieved succesfully"
    });
});

//patch method => patch is used to modify or update data

app.patch("/user", (req,res) => {
    console.log(req.body);
    //update data in user object
    for(key in req.body){
        user[key] = req.body[key];
    }
    res.json({
        user : req.body,
        message : "data updated successfully"
    });
});

//delete method => delete is used to the data

app.delete("/user", (req,res) => {
    user = {};
    res.json({
        message : "data deleted successfully"
    })
});