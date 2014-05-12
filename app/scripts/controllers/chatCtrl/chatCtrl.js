/**
 * Created by dsalmeron on 07/05/14.
 */

app.controller('ChatCtrl', ['$scope', 'socketService', '$log', function ($scope, socketService, $log) {
    $scope.message = {
        author: "anonimo",
        content: ""
    };
    $scope.messageLog = [];
    $scope.sendMessage = function (message) {
        var matchNick = message.content.match('^\/nick (.*)');
        var matchServer = message.content.match('^\/server (.*)');
        if (angular.isDefined(matchNick) && angular.isArray(matchNick) && matchNick.length === 2) {
            message.author = matchNick[1];
            $scope.message.content = '';
        } else if (angular.isDefined(matchServer) && angular.isArray(matchServer) && matchServer.length === 2) {
            socketService.setServer(matchServer[1]);
            $scope.message.content = "";
        } else {
            socketService.mySocket.emit('/messages/create', message, $scope.addMessage);
            $scope.message.content = "";
        }
    };
    $scope.addMessage = function (message) {
        //$scope.messageLog.push(message);
        $log.debug('se dispara la funcion que recibe como callback, con el mensaje: ' + message.content);

    };
    //socketService.mySocket.forward(['newMessage', 'broadcast'], $scope);
    $scope.$on('socket:newMessage', function (event, data) {
        $log.debug('got a message from: ', data.author);
        $log.debug('event: ', event);
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