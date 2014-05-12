/**
 * Created by dsalmeron on 07/05/14.
 */

app.controller('ChatCtrl', ['$scope', 'socketService', '$log', function ($scope, socketService, $log) {
    $scope.nickName = "daveh";
    $scope.message = {
        author: $scope.nickName,
        content: ""
    };
    $scope.messageLog = [];

    $scope.sendMessage = function (message) {
        var splitted = message.content.split(" ");
        if (splitted[0] == "/nickname") {
            $scope.nickName = "";
            for (var i = 0; i < splitted.length; i++) {
                $scope.nickName += splitted[i + 1];
            }
            $scope.message.content = "";
        } else {
            //$scope.messageLog.push(message);
            socketService.emit('/messages/create', message, $scope.addMessage);
            $scope.message.content = "";
        }
    };

    $scope.addMessage = function (message) {
        //$scope.messageLog.push(message);
        $log.debug('se dispara la funcion que recibe como callback, con el mensaje' + message);
    };

    socketService.forward('newMessage', $scope);
    $scope.$on('socket:newMessage', function (event, data) {
        $log.debug('got a message', data.author);
        /*if (!data.content) {
            $log.error('invalid message', 'data', JSON.stringify(data));
            return;
        }*/
        $scope.$apply(function () {
            $scope.messageLog.push(data);
            //log$scope.messageLog = messageFormatter(new Date(), data.source, data.payload) + $scope.messageLog;
        });
    });
}]);