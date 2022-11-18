MongoDB, the most popular NoSQL database, is an open-source document-oriented database. The term ‘NoSQL’ means ‘non-relational’. It means that MongoDB isn’t based on the table-like relational database structure but provides an altogether different mechanism for storage and retrieval of data. This format of storage is called BSON ( similar to JSON format).

Features of MongoDB:

1. Document Oriented: MongoDB stores the main subject in the minimal number of documents and not by breaking it up into multiple relational structures like RDBMS. For example, it stores all the information of a computer in a single document called Computer and not in distinct relational structures like CPU, RAM, Hard disk, etc.
2. Indexing: Without indexing, a database would have to scan every document of a collection to select those that match the query which would be inefficient. So, for efficient searching Indexing is a must and MongoDB uses it to process huge volumes of data in very less time.
3. Scalability: MongoDB scales horizontally using sharding (partitioning data across various servers). Data is partitioned into data chunks using the shard key, and these data chunks are evenly distributed across shards that reside across many physical servers. Also, new machines can be added to a running database.
4. Replication and High Availability: MongoDB increases the data availability with multiple copies of data on different servers. By providing redundancy, it protects the database from hardware failures. If one server goes down, the data can be retrieved easily from other active servers which also had the data stored on them.
5. Aggregation: Aggregation operations process data records and return the computed results. It is similar to the GROUPBY clause in SQL. A few aggregation expressions are sum, avg, min, max, etc
Where do we use MongoDB?

MongoDB is preferred over RDBMS in the following scenarios:

1. Big Data: If you have huge amount of data to be stored in tables, think of MongoDB before RDBMS databases. MongoDB has built-in solution for partitioning and sharding your database.
2. Unstable Schema: Adding a new column in RDBMS is hard whereas MongoDB is schema-less. Adding a new field does not effect old documents and will be very easy.
3. Distributed data Since multiple copies of data are stored across different servers, recovery of data is instant and safe even if there is a hardware failure.

Mongoose Documentation- https://mongoosejs.com/ (Here you will find all the things you should know to get started with MongoDB)

Mongoose.js connects your MongoDB clusters or collections with your Node.js app. It enables you to create schemas for your documents. Mongoose provides a lot of functionality when creating and working with schemas.

In this tutorial we will look at how to connect a MongoDB instance with a Node.js application.

How to Connect MongoDB to Node.js Using Mongoose
MongoDB is one of the most widely used No-SQL databases in the developer world today. No-SQL databases allow developers to send and retrieve data as JSON documents, instead of SQL objects. To work with MongoDB in a Node.js app, we can use Mongoose.

Prerequisites
Before we move on, you’ll need to have the following:

Node.js installed on your machine.
A MongoDB instance running on your machine. You won’t need this if you want to use MongoDB Atlas.
Some knowledge of Node.js and Express.js.
Step 1 - Installing Mongoose on a Node.js environment
Create and navigate to a new folder by running the following commands on a terminal.

$ mkdir mongoose_tutorial
$ cd mongoose_tutorial
Then install Express and Mongoose by executing the following command on a terminal.

$ npm install express mongoose --save
If you are using Yarn, run:

$ yarn add express mongoose
Step 2 – Creating the connection
Create a new file server.js to start our Express.js server. Load mongoose and express by adding the following code to server.js.

server.js

const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

app.use(express.json());
Then connect to a local MongoDB instance using the mongoose.connect() function.

server.js

mongoose.connect('mongodb://localhost:27017/usersdb',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
We pass the useNewUrlParser: true, etc. to mongoose.connect() to avoid the DeprecationWarning.

To create a connection to MongoDB Atlas, follow the next steps.

Open your Cluster tab in MongoDb Atlas and click CONNECT.
Connect to cluster

Select Connect your application and choose Node.js for the driver.
Copy the connection string.
Connection string

With the connection at hand, create the following variables and replace their values using your actual credentials.

server.js

const username = "<mongodb username>";
const password = "<password>";
const cluster = "<cluster name>";
const dbname = "myFirstDatabase";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
It’s important to note that the cluster variable is the values appearing between the @ and .mongodb.net. In my case the cluster variable is cluster0.vte2d.

To make sure your connection was successful, add the following code right below your mongoose.connect().

server.js

// ...
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
Then, set the app to listen to port 3000.

server.js

// ...
app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
We will create the Router later.

Step 3 – Creating the schema
Now let’s define a collection schema for our application.

Create another file models.js and add the following code.

models.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
We create a schema UserSchema using the mongoose.Schema() method. The schema collects the name and age fields sent from the request.

We then export the schema using the last 2 lines.

Step 4 – Creating the POST endpoint
Create a new file routes.js. This file defines the endpoints for our app.

Load express and the schema we created in Step 3 by adding the following code.

routes.js

const express = require("express");
const userModel = require("./models");
const app = express();
Then create the POST endpoint by adding the following code.

routes.js

// ...
app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
We create a route /add_user to add a new user to the database. We parse the content to be saved to the database using the line const user = new userModel(request.body);.

We then use a try/catch block to save the object to the database using the .save() method.

Step 5 – Creating the GET endpoint
Add the following lines of code to the routes.js file.

routes.js

// ...
app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
We create a route /users to retrieve all the users saved using the /add_user route. We collect these users from the database using the .find() method. We then use a try/catch block to ‘send’ the users to this endpoint.

Finally, export these endpoints by adding the line below.

routes.js

// ...
module.exports = app;
At this point, your application is ready. Serve the app by running the command below.

$ node server.js
Step 6 – Testing the endpoints
Now, let’s test the two endpoints we created above.

Open Postman and make a POST request to the http://localhost:3000/add_user endpoint.

Add user to database

A new user is added to the database. You can check your collections to confirm this.

Make a GET request to the http://localhost:3000/users endpoint.

GET all users

The endpoint returns a list of all the users added to the database.


Mongoose Hooks ->

Save/Validate Hooks ->
The save method will trigger validate hooks.

This is because Mongoose calls the pre('save') hook that calls validate .

The pre('validate') and post('validate') hooks are called before any pre('save') hooks.

For example, we can write:

async function run() {
  const { createConnection, Schema } = require('mongoose');
  const connection = createConnection('mongodb://localhost:27017/test');
  const schema = new Schema({ name: String });
  schema.pre('validate', () => {
    console.log('1');
  });
  schema.post('validate', () => {
    console.log('2');
  });
  schema.pre('save', () => {
    console.log('3');
  });
  schema.post('save', () => {
    console.log('4');
  });
  const User = connection.model('User', schema);
  new User({ name: 'test' }).save();
}
run();
to add the schema hooks.

Then they’ll be called one by one in the same order that they’re listed.


Query Middleware ->
Pre and post save hooks aren’t run when update methods are run.

For example, if we have:

async function run() {
  const { createConnection, Schema } = require('mongoose');
  const connection = createConnection('mongodb://localhost:27017/test');
  const schema = new Schema({ name: String });
  schema.pre('updateOne', { document: true, query: false }, function() {
    console.log('Updating');
  });
  const User = connection.model('User', schema);
  const doc = new User();
  await doc.updateOne({ $set: { name: 'test' } });
  await User.updateOne({}, { $set: { name: 'test' } });
}
run();
Then when we have query set to false or didn’t add the query property, then the updateOne pre hook won’t run when we run updateOne .

Aggregation Hooks ->
We can add aggregation hooks.

For example, we can write:

async function run() {
  const { createConnection, Schema } = require('mongoose');
  const connection = createConnection('mongodb://localhost:27017/test');
  const schema = new Schema({
    name: {
      type: String,
      unique: true
    }
  });
  schema.pre('aggregate', function() {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  });
  const User = connection.model('User', schema);
}
run();
We listen to the aggregate event.

Error Hooks ->
We can get errors from hooks.

For example, we can write:

async function run() {
  const { createConnection, Schema } = require('mongoose');
  const connection = createConnection('mongodb://localhost:27017/test');
  const schema = new Schema({
    name: {
      type: String,
      unique: true
    }
  });
  schema.post('update', function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('There was a duplicate key error'));
    } else {
      next();
    }
  });
  const User = connection.model('User', schema);
}
run();
We listen to the update event and get the error from the error parameter.

We can get the name and code to get information about the error.

Synchronous Hooks ->
Some hooks are always synchronous.

init hooks are always synchronous because the init function is synchronous.

For example, if we have:

async function run() {
  const { createConnection, Schema } = require('mongoose');
  const connection = createConnection('mongodb://localhost:27017/test');
  const schema = new Schema({
    name: String
  });
  schema.pre('init', obj => {
    console.log(obj);
  });
  const User = connection.model('User', schema);
}
run();
We added the pre init hook with a callback.