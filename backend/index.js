var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');


app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
    username : "admin",
    password : "admin"
}]


var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

app.use(bodyParser.json());
app.post('/login',function(req,res){
    
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    
    Users.filter(function(user){
        if(user.username === req.body.em && user.password === req.body.pwd){
            console.log("Successful Login Done");
            console.log(user.username);
            console.log(req.body.em);
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            //console.log(cookie.load('cookie'));
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
    })

    
});

app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})

app.post('/create',function(req,res){
    
   
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    var newBook = {BookID: req.body.BookID, Title: req.body.Title, Author : req.body.Author};
        books.push(newBook);
      
        console.log("Book Added Successfully!!!!");
               res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        //}
    // })

    
});

app.post('/delete',function(req,res){
    
   
    console.log("Inside Delete Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    var index = books.map(function(book){
        return book.BookID;
     }).indexOf(req.body.BookID); 
     
     if(index === -1){
        console.log("Book Not Found");
     } else {
        books.splice(index, 1);
        console.log("Book : " + req.body.BookID + " was removed successfully");
        
     }
                res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        //}
    // })

    
});

app.listen(3001);
console.log("Server Listening on port 3001");      