//server creation

//1.http module

const http = require('http');   //http server
const fs = require('fs');       //file Read Module
const _ = require('lodash');    //lodash package

//in built http method to create server having two parameter req and res
const server = http.createServer((req, res)=>{
    console.log("request has been made by the browser to the server"); //requesting server to respond
    console.log(req.method); //returns the method of the request made (GET/POST)
    console.log(req.url); //return url of the page we are requesting for
    console.log(req.statusCode); //returns the status of the request (success/fail)
    console.log(_.random(0,20));

    res.setHeader('Content-Type', 'text/html'); //set the content type of the response 

    //defined the initial path of the file we want to display
    let path = './pages'; 

    //switch case for different request urls and response files
    switch(req.url){                  
        case '/' :
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about' :
            path += '/about.html';
            res.statusCode = 200;   
            break;
        case '/about-me' :
            res.setHeader('Location','/about');  //if we want to redirect user from "about-me" to "about" page
            res.end();
            res.statusCode = 301;   //redirect status code    
            break;    
        default :
            path += '/404.html';
            res.statusCode = 404;
            break;    
    };

    //readfile method to read the file properly if error encountered return the error
    fs.readFile(path, (err, fileData) =>{
        if(err){
            console.log(err);
        }else{
            res.write(fileData); //write method actually write the response we are sending for a particular request
            res.end(); //we have successfully send our response now end it
        }
    });
    // res.write('<h1>Hello, everyone. Kartikey, here ! :) </h1>');
    // res.write('<h2>How you doing ? :) </h2>');
    // res.end();
    console.log(res.statusCode); //status code of response
});

//now server is continously listening to the request made to it by localhost at port 3000
server.listen(3000,'localhost', () => {
    console.log('server is listening on port 3000');
});