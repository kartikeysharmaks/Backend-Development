const express = require("express"); //express package
const app = express(); //instance of express app
const mongoose = require("mongoose"); //mongoose package
const emailValidator = require("email-validator"); //email validator package

//Database auth URL
const db_link =
  "mongodb+srv://kartik:foodAppkartikey@cluster0.q6888vs.mongodb.net/?retryWrites=true&w=majority";

//connecting MongoDB database with our application
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//Defining Schema for our Users
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email); //validating our email
    },
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
    validate: function () {
      return this.password == this.confirmPassword; //confirming whether password and confirm password are same or not
    },
  },
});

//Model of user created with userSchema
const userModel = mongoose.model("userModel", userSchema);

//server is listening to the requests
app.listen(3000, () => {
  console.log("Server is running at Port 3000");
});

//middleware function
app.use(express.json());

//router apps
const userRouter = express.Router();

//path of that router
app.use("/user", userRouter);

//methods that will applied to these paths(get, post, patch, delete)
userRouter
  .route("/")
  .get(getUser)
  .get(getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

//example to create a user
async function createUser() {
  let user1 = {
    name: "Jasbir",
    email: "abcd@gmail.com",
    password: "123456789",
    confirmPassword: "123456789",
  };
  let data = await userModel.create(user1);
  console.log(data);
}

//function to get the list of all the users
async function getUsers(req, res) {
  let allUsers = await userModel.find();
  res.json({
    message: "list of all users: ",
    data: allUsers,
  });
}

//function to get the particular user
async function getUser(req, res) {
  let userToFind = req.body; //{ name: "Abhishek" }
  let particularUser = await userModel.findOne(userToFind);
  res.json({
    message: "Details of Particular user",
    data: particularUser,
  });
}

//function to create a user and send that user data to the database
async function postUser(req, res) {
  let data = req.body;
  let userData = await userModel.create(data);
  console.log(userData);
  res.json({
    message: "user signed up successfully",
    data: userData,
  });
}

//function to update the particular information of any user
async function updateUser(req, res) {
  console.log(req.body);
  let dataToBeUpdated = req.body;
  let dataToBeUpdatedIn = await userModel.findOneAndUpdate(
    { email: "abc@gmail.com" },
    dataToBeUpdated
  );
  res.json({
    message: "userData updated successfully",
    userDataUpdated: dataToBeUpdated,
    dataToBeUpdatedIn: dataToBeUpdatedIn,
  });
}

//function to delete the user
async function deleteUser(req, res) {
  let userToDelete = req.body;
  let userToBeDeleted = await userModel.findOneAndDelete(userToDelete);
  res.json({
    message: "userData deleted successfully",
    userDataDeleted: userToBeDeleted,
  });
}

//Mongoose Hooks (pre -> Before saving to DB & post -> After saving to DB)

//Here we dont need to store confirm password to our DB because we dont want data redundancy and has earlier validated confirm password and password field
userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});
