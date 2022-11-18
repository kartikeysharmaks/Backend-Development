const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://kartik:foodAppkartikey@cluster0.q6888vs.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const userModel = mongoose.model("userModel", userSchema);

app.listen(3000, () => {
  console.log("Server is running at Port 3000");
});

app.use(express.json());

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser)
  .get(getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

async function createUser() {
  let user1 = {
    name: "Jasbir",
    email: "abcd@gmail.com",
    password: "123456789",
    confirmPassword: "123456789",
  };
  let data = await userModel.create(user1);
  console.log(data);
};

async function getUsers(req, res) {
  let allUsers = await userModel.find();
  res.json({
    message: "list of all users: ",
    data: allUsers,
  });
};

async function getUser(req, res) {
  let particularUser = await userModel.findOne({ name: "Abhishek" });
  res.json({
    message: "Details of Particular user",
    data: particularUser,
  });
};

async function postUser(req, res) {
  let data = req.body;
  let userData = await userModel.create(data);
  console.log(userData);
  res.json({
    message: "user signed up successfully",
    data: userData,
  });
};

async function updateUser(req, res) {
  console.log(req.body);
  let dataToBeUpdated = req.body;
  let dataToBeUpdatedIn = await userModel.findOneAndUpdate({email : "abc@gmail.com"}, dataToBeUpdated);   
  res.json({
    message: "userData updated successfully",
    userDataUpdated : dataToBeUpdated,
    
  });
};

async function deleteUser(req, res) {
  let userToDelete = req.body;  
  let userToBeDeleted = await userModel.findOneAndDelete(userToDelete);
  res.json({
    message: "userData deleted successfully",
    userDataDeleted : userToBeDeleted,
  });
};

function getSignup(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
};

function postSignup(req, res) {
  let data = req.body;
  console.log(data);
  res.json({
    message: "user signed up",
    data: data,
  });
};