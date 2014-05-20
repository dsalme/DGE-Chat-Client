'use strict';
app.factory('socketService', function (socketFactory) {
    var mySocket = socketFactory({
        ioSocket: io.connect('http://192.168.2.110:3000')
    });
    //mySocket.forward(['broadcast', 'newMessage']);
    return mySocket;
});
