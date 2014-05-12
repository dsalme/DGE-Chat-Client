'use strict';
app.factory('socketService', function (socketFactory) {
    io.connect('http://localhost:3000');
    var socket = socketFactory();
    //socket.forward('broadcast');
    return socket;
});
