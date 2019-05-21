
$(function(){

    var socket = io('/hidden');
    var username = "anonymous" ; 
    var $usernameInput = $('.usernameInput');
    var $loginPage = $('.login.page'); 

    var $window = $(window);
    var $messages = $('.messages'); // Messages area
    var $inputMessage = $('#m'); // Input message input box
    var $chatPage = $('.chat.page'); // The chatroom page   
  
    // Prompt for setting a username
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();



    $window.keydown(event => {
        if (event.which !== 13){
            return; 
        } 
        let temp = $usernameInput.val() ; 
        if(temp === "" || username !== "anonymous") {
            $usernameInput.val('');
            socket.emit('chat message', { val: $('#m').val() , id: username } );
            $('#m').val('');
            return false ;
        }

        username = temp ; 
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        socket.emit('new user', username );
        $usernameInput.val('');
        $currentInput = $inputMessage.focus();
        return false; 
    });

    $('#mform').submit(function(e){
        e.preventDefault();
        socket.emit('chat message', { val: $('#m').val() , id: username } );
        $('#m').val('');
        $currentInput = $inputMessage.focus();
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
