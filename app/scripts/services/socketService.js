'use strict';
app.factory('socketService', function (socketFactory) {

    var myIoSocket = io.connect('http://192.168.31.121:3000');

    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });
    mySocket.forward(['broadcast', 'newMessage']);
    //mySocket.forward();

    return {
        mySocket : mySocket,
        setServer : function(direccion){
            myIoSocket = io.connect(direccion);
        }
    };
});
