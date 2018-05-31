var express=require("express");
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path=require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"public")));
var requestIp = require('request-ip');
colors=["#FFCDD2","#F50057","#9C27B0","#E040FB","#651FFF","#3D5AFE","#1E88E5","#00B0FF","#76FF03","#AEEA00","#FFC400","#FF6E40","#B0BEC5","#FFC107"];
dmsg={};



app.get('/', function(req, res){
  var ip=requestIp.getClientIp(req);
  if(! dmsg[ip.substring(7)])
  {
    var userinfo=[colors[Math.floor(Math.random() * 14)]];
    dmsg[ip.substring(7)]=userinfo;
  }
  res.sendFile(__dirname + '/index.html');
});

app.post("/",function(req,res)
{
  var ip=requestIp.getClientIp(req);
  var username=req.body.user.name;
  dmsg[ip.substring(7)][1]=username;
  res.sendFile(__dirname + '/chatroom.html');
});

app.get('/about', function(req, res){
  res.status(300).sendFile(path.join(__dirname,"about.html"));
});

io.on('connection', function(socket){
  socket.on('dchat msg', function(msg){
  	var userip=socket.request.connection._peername.address;
  	dmsg.message=msg;
  	dmsg.user=userip.substring(7);
  	dmsg.ucolor='red';//dmsg[userip.substring(7)][0];
    dmsg.uname='user';//dmsg[userip.substring(7)][1];
    io.emit('dchat msg', dmsg);
  });
});

http.listen(port);