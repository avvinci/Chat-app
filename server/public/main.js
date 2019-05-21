
$(function(){

    var socket = io();
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
        $('#messages').append($('<li>').text(msg));
    });

    socket.on('new user hello', function(msg){
        $('#messages').append($('<li>').text(msg));
    });

    socket.on('user image', image);

    $('#imagefile').bind('change', function(e){
        var data = e.originalEvent.target.files[0];
        var reader = new FileReader();
        reader.onload = function(evt){
          image('me: ', evt.target.result);
          socket.emit('user image', evt.target.result);
        };
        reader.readAsDataURL(data);
        
      });

});


function image (from, base64Image) {
    $('#messages').append($('<p>').append($('<b>').text(from), '<img class="thumb" src="' + base64Image + '"/>'));
  }