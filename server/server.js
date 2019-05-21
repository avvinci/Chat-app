var express = require('express')
let app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http) ; 


// app.get('/', function(req,res){
//     res.sendFile(__dirname + '/index.html');
// }) 

app.use(express.static(path.join(__dirname, 'public'))); 



io.on('connection',function(socket){

    let name = "anonymous" ; 
    console.log('user connected') ; 
    console.log(socket.id)  ;


    socket.on('chat message', function(msg){
    // console.log('chat by : '+ msg.id) ; 
    io.emit('chat message', msg);
    });

    socket.on('new user', function(msg){
        io.emit('new user', msg) ; 
        io.to(socket.id).emit('new user hello', 'Hi '+ msg + ', welcome to WeChat :)  ');
        console.log('user ::' , msg ) ; 
        name  = msg ; 
    });

    socket.on('disconnect', function(){
        io.emit('disconnected', name + ' has disconnected');
        // console.log('user disconnnected') ;
    });

    socket.on('user image', function(data){
        // console.log(data) ; 
        io.emit('user image', name + ': ' , data); 
    });

});

// const hidden = io.of('/hidden') ; 

// hidden.on('connection', function(socket){
//     console.log('someone connected to hidden') ; 
   
// });

// hidden.emit('hi', 'everyone!')  ; 


http.listen(3000,function(){
    console.log('listening on *: 3000');
});