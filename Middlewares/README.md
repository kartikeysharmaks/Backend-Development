What is middleware and how to use middleware in node.js with express.js?

Middleware is a piece of code (function) that is used to execute some code after the server gets a call from a client and before the controller action which will send a response. So it means that whenever a client will call an API, before reaching the request to that API (route), middleware code will be executed.

Middleware is used for different purposes like logging requests, and verifying requests for some specific requirement. Like in this article, we will be using middleware to verify if some specific key is present in the request headers or not.


Creating a Node server using express.js ->

For creating a node.js server, go to a folder and open vscode in it. Run the command npm init to initialize the node.js project. It will create a package.json file in your root directory. Then command npm install express to install express.js which we will use to create our server. 

Optionally, run the command npm install nodemon this will install nodemon in your project. Nodemon is used to auto-refresh your node.js project without starting the server again and again. 


Creating the middleware ->

In node.js, middleware has three parameters req, res, and next. Next is very important here. When we process our logic in the middleware then at the end we have to call next() so that call can react to the desired route.

We will be creating a middleware that will check every request and verify if some specific key (some-key in our case) is present in the header or not. If a key is there, then it will pass the request to the route otherwise it will reject the call and send the response that the request is invalid.

Create a folder with the name middleware (you can give any name but the code I am using for this article have this name) and add a file middleware.js in it. Then add the following code in the file.


Some key points about Middlewares ->

1. Middlewares are similar to controller actions (routes)
Controller actions which have req, and res variables are similar to middleware. The only difference is that middleware also has a variable next which will be called at the end of middleware. It is not necessary for the next() method to be called at the end of the middleware method. It can be used anywhere in the middleware where the next route needs to be called.

2. Middleware work in order
Middleware work in the same order in which they are defined in the app.js file. For example, there are two middleware MiddlewareA and MiddlewareB these both will be called in order. First MiddlewareA will be executed and then MiddlewareB will be executed.