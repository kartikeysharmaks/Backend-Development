//server creation

//1.Express Module

const express = require("express"); //express server
const app = express(); //creating an instance of the server

app.get("/", (req, res) => {
  res.send("Hello World"); //sending response back to the request "/"
  console.log("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About"); //sending response back to the request "/about"
  console.log("About");
});

app.get("/main", (req, res) => {
  res.sendFile("./pages/index.html", { root: __dirname }); //sending a whole html file as a response to a request "/main"
}); //here we have to provide a relative path and the root directory name

app.get("/service", (req, res) => {
  res.sendFile(
    "C:UserskartiDesktop\backend-developmentserverUsingExpresspagesindex.html"
  ); //sending a whole html file as a response to a request "/main"
}); //here we have to provide actual path of a file in a system

app.get("/about-me", (req, res) => {
  res.redirect("/about"); //redirecting "/about-me" to "/about"
});

app.use((req, res) => {
  res.status(404).sendFile("./pages/404.html", { root: __dirname }); //default case for wrong routes
});

app.listen(3000, () => {
  console.log("App is listening at Port 3000");  //server is listening to the requests
});
