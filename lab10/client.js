//
//  client
//  WebLabs
//
//  Created on 04/12/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//
jQuery(function ($) {
    var socket= new io.connect();
    var $nameForm= $('#setName');
    var $nameBox = $('#name');
    var $user =$('#users')
    var $messageForm = $('#send-message');
    var $messageBox= $('#message');
    var $chat = $('#chat');


    socket.connect('http://localhost:3000');

    $nameForm.submit(function (e) {
        e.preventDefault();
        socket.emit('new user',$nameBox.val(),function (data) {
            if(data){
                $('#nameContainer').hide();
                $('#contentWrap').show();
            }
        });
        $nameBox.val();
    });

    socket.on('usernames',function (data) {
        var html='';
        for(i=0;i<data.length;i++){
            html+=data[i]+ '</br>'
        }
        $user.html(html);
    });



    $messageForm.submit(function (e){
        e.preventDefault();
        socket.emit('send message',$messageBox.val());
        $messageBox.val('');
    });
    socket.on('new message',function (data) {
        $chat.append('<b>' + data.name + ' :</b> ' +data.message + "<br/>");
    });

});
