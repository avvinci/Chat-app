
$(function(){

    var socket = io();
    var username = "anonymous" ; 
    // prompt("Enter your username?");

    $('#uf').submit(function(e){
        e.preventDefault();
        let temp = $('#u').val() ; 
        if(temp === "" || username !== "anonymous") {
            $('#u').val('');
            return false ;
        }
        username = temp ; 
        socket.emit('new user', username );
        $('#u').val('');
        return false; 
    });

    $('#mform').submit(function(e){
        e.preventDefault();
        socket.emit('chat message', { val: $('#m').val() , id: username } );
        $('#m').val('');
        return false; 
    });

    socket.on('new user' , function(msg){
        $('#online-users').append( $('<li>').text(msg + ' is online')) ; 
    });

    socket.on('chat message' , function(msg){
        $('#messages').append($('<li>').text( msg.id + ': ' + msg.val));
    });

    socket.on('disconnected' , function(msg){
        $('#messages').append($('<li>').text(   msg));
    });

    });
