'use strict';
app.factory('socketService', function (socketFactory) {

    var myIoSocket = io.connect('http://192.168.2.109:3000');

    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });
    mySocket.forward('broadcast');

    return mySocket;
});
