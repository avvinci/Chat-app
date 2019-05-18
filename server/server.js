var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http) ; 

let name = "" ; 

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    console.log('user connected') ; 
    socket.on('chat message', function(msg){
    console.log('chat by : '+ msg.id) ; 
    name = msg.id ; 
    io.emit('chat message', msg);
    });
    // socket.on('new user', function(msg){
    //     name  = msg ; 
    // });
    socket.on('disconnect',function(){
        io.emit('disconnected', name + ' has disconnected');
        console.log('user disconnnected') ;
    });

});

http.listen(3000,function(){
    console.log('listening on *: 3000');
});