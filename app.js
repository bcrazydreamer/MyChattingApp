  var express=require("express");
  var app=express();
  var path=require('path');
  var fs = require('fs')
  var requestIp = require('request-ip');
  app.use(express.static(path.join(__dirname,"public")));
  var port = process.env.PORT || 3000;
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }));
  var mydata='';
  var oldtext="";
  loginstatus=false;
  loggeduser='';

var passnot='<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="icon" href="app_pics/logo/logo.png" type="image/x-icon" /><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><link href="css/font-awesome.min.css" type="text/css" rel="stylesheet"/><link href="css/login.css" type="text/css" rel="stylesheet"/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><style type="text/css">.logindiv{height: 50%; width: 100%;}</style><body class="backgroundb"><nav class="unselectable" style="background-color: #fff"><center><a href="/"><img src="app_pics/logo/logo.png" class="pichead" height="150" width="190"></a></center></nav><div class="container"><center><div class="alert alert-warning" style="margin: 20px;width: 50%"> <strong>Invalid Password!</strong> Password is wrong. </div><div class="col-md-6 col-md-push-3 create_popup_div unselectable"><div style="background: rgba(0,0,0,0.2);margin-top: 10%"><br><h1>Login</h1><form action="/login" method="post"> <input type="text" id="username" name="username" class="input" placeholder="Username" required="required"/> <input type="password" id="password" name="password" placeholder="Password" class="input" required="required"/> <center> <input type="submit" name="submit" id="loginbtn" class="inputbtn unselectable" value="Sign In"> </center> </form> <br><br></div></div></center></div><footer class="unselectable"><center><a class="icon-link round facebook" target="_blank"><i class="fa fa-facebook"></i></a><a class="icon-link round tumblr" href="https://github.com/bcrazydreamer" target="_blank"><i class="fa fa-github"></i></a><a class="icon-link round twitter" href="https://twitter.com/imbharatrawat" target="_blank"><i class="fa fa-twitter"></i></a><a class="icon-link round instagram" href="https://instagram.com/bharat_xettri" target="_blank"><i class="fa fa-instagram"></i></a></center></br><center><h2 style="color: rgba(0,0,0,0.5);">DCodeShare © 2018</h2></center></footer></body></html>';
var unamnot='<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="icon" href="app_pics/logo/logo.png" type="image/x-icon" /><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><link href="css/font-awesome.min.css" type="text/css" rel="stylesheet"/><link href="css/login.css" type="text/css" rel="stylesheet"/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><style type="text/css">.logindiv{height: 50%; width: 100%;}</style><body class="backgroundb"><nav class="unselectable" style="background-color: #fff"><center><a href="/"><img src="app_pics/logo/logo.png" class="pichead" height="150" width="190"></a></center></nav><div class="container"><center><div class="alert alert-warning" style="margin: 20px;width: 50%"> <strong>Invalid Username!</strong> Username is wrong. </div><div class="col-md-6 col-md-push-3 create_popup_div unselectable"><div style="background: rgba(0,0,0,0.2);margin-top: 10%"><br><h1>Login</h1><form action="/login" method="post"> <input type="text" id="username" name="username" class="input" placeholder="Username" required="required"/> <input type="password" id="password" name="password" placeholder="Password" class="input" required="required"/> <center> <input type="submit" name="submit" id="loginbtn" class="inputbtn unselectable" value="Sign In"> </center> </form> <br><br></div></div></center></div><footer class="unselectable"><center><a class="icon-link round facebook" target="_blank"><i class="fa fa-facebook"></i></a><a class="icon-link round tumblr" href="https://github.com/bcrazydreamer" target="_blank"><i class="fa fa-github"></i></a><a class="icon-link round twitter" href="https://twitter.com/imbharatrawat" target="_blank"><i class="fa fa-twitter"></i></a><a class="icon-link round instagram" href="https://instagram.com/bharat_xettri" target="_blank"><i class="fa fa-instagram"></i></a></center></br><center><h2 style="color: rgba(0,0,0,0.5);">DCodeShare © 2018</h2></center></footer></body></html>';
var invalidlogin='<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="icon" href="app_pics/logo/logo.png" type="image/x-icon" /><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><link href="css/font-awesome.min.css" type="text/css" rel="stylesheet"/><link href="css/login.css" type="text/css" rel="stylesheet"/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><style type="text/css">.logindiv{height: 50%; width: 100%;}</style><body class="backgroundb"><nav class="unselectable" style="background-color: #fff"><center><a href="/"><img src="app_pics/logo/logo.png" class="pichead" height="150" width="190"></a></center></nav><div class="container"><center><div class="alert alert-warning" style="margin: 20px;width: 50%"> <strong>Invalid Username and Password!</strong> </div><div class="col-md-6 col-md-push-3 create_popup_div unselectable"><div style="background: rgba(0,0,0,0.2);margin-top: 10%"><br><h1>Login</h1><form action="/login" method="post"> <input type="text" id="username" name="username" class="input" placeholder="Username" required="required"/> <input type="password" id="password" name="password" placeholder="Password" class="input" required="required"/> <center> <input type="submit" name="submit" id="loginbtn" class="inputbtn unselectable" value="Sign In"> </center> </form> <br><br></div></div></center></div><footer class="unselectable"><center><a class="icon-link round facebook" target="_blank"><i class="fa fa-facebook"></i></a><a class="icon-link round tumblr" href="https://github.com/bcrazydreamer" target="_blank"><i class="fa fa-github"></i></a><a class="icon-link round twitter" href="https://twitter.com/imbharatrawat" target="_blank"><i class="fa fa-twitter"></i></a><a class="icon-link round instagram" href="https://instagram.com/bharat_xettri" target="_blank"><i class="fa fa-instagram"></i></a></center></br><center><h2 style="color: rgba(0,0,0,0.5);">DCodeShare © 2018</h2></center></footer></body></html>';
var loggeduser='';

app.get("/login",function(req,res){
  console.log("login");
  res.status(300).sendFile(path.join(__dirname,"login.html"));
  });
app.post("/login",function(req,res)
{
  var data=req.body;
  var unam=data.username.toLowerCase();
  var pass=data.password;
  if(unam=="admin" && pass=="qwerty"){
    loggeduser=requestIp.getClientIp(req);
    res.status(300).sendFile(path.join(__dirname,"logintemp.html"));
    loginstatus=true;
  }
  else if(pass=="qwerty")
  {
    if(unam!="admin")
    {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(unamnot);
    }
  }
  else
  {
    if(unam=="admin")
    {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(passnot);
    }
    else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(invalidlogin);
  }
}
});
app.get("/logout",function(req,res){
  var temp='';
  temp=requestIp.getClientIp(req)
  if(loggeduser=='')
  {
    res.status(300).sendFile(path.join(__dirname,"login.html"));
  }
  else if(loggeduser!=temp)
  {
    res.status(300).sendFile(path.join(__dirname,"login.html"));
  }
  else
  {
    loginstatus=false;
    res.status(300).sendFile(path.join(__dirname,"login.html"));
  }
});

app.get("/",function(req,res){
  if(loginstatus && (loggeduser==requestIp.getClientIp(req)))
   {
      res.status(300).sendFile(path.join(__dirname,"senderindex.html"));
  }
  else{
    res.status(300).sendFile(path.join(__dirname,"login.html"));
  }
});

app.get("/sender",function(req,res){
  if(loginstatus && (loggeduser==requestIp.getClientIp(req)))
   {
      res.status(300).sendFile(path.join(__dirname,"sender.html"));
  }
  else{
    res.status(300).sendFile(path.join(__dirname,"login.html"));
  }
});

app.get("/user",function(req,res){
  res.status(300).sendFile(path.join(__dirname,"user.html"));
});


app.post("/sender",function(req,res){
  fs.writeFile('public/value.js', 'dataval="";' , function (err) {});
  var data=req.body;
  mydata=data.testbox;
  var txt='';
  for(i=0;i<mydata.length;i++)
  {
    if(mydata[i]=='"'){
      txt=txt+'\\"';
    }
    else if(mydata[i]==';')
    {
      txt=txt+'\\;';
    }
    else if(mydata[i].match(/^[0-9a-z]+$/))
    {
      txt=txt+mydata[i];
    }
    else if(mydata[i].match(/^[0-9A-Z]+$/))
    {
      txt=txt+mydata[i];
    }
    else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(mydata[i]))
    {
      txt=txt+mydata[i];
    }
    else if(mydata[i]==' ')
    {
      txt=txt+" ";
    }
    else{
      txt=txt+'\\n';
    }
  }

  fs.writeFile('public/value.js', 'dataval="'+txt+'";' , function (err) {});
  res.json({ created: true });      
  //res.status(300).sendFile(path.join(__dirname,"sender.html"));
});

//--------------------------------------------------------------------------------------------------------
app.listen(port);