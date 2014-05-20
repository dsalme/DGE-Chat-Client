/**
 * Created by dsalmeron on 07/05/14.
 */

app.controller('ChatCtrl', ['$scope', 'socketService', '$log', function ($scope, socketService, $log) {

    socketService.forward(['newMessage', 'newNick','connected','newUser'], $scope);

    $scope.message = {
        author: "",
        content: ""
    };

    $scope.messageLog = [];
    $scope.sendMessage = function (message) {
        var matchNick = message.content.match('^\/nick (.*)');
        var matchServer = message.content.match('^\/server (.*)');
        if (angular.isDefined(matchNick) && angular.isArray(matchNick) && matchNick.length === 2) {
            message.content = matchNick[1];
            socketService.emit('/messages/newNick', message, $scope.addMessage);
            message.author = matchNick[1];
            $scope.message.content = '';
        } else if (angular.isDefined(matchServer) && angular.isArray(matchServer) && matchServer.length === 2) {
            //socketService = setServer(matchServer[1]);
            $scope.message.content = "";
        } else {
            socketService.emit('/messages/newMessage', message, $scope.addMessage);
            $scope.message.content = "";
        }
    };
    $scope.addMessage = function (message) {
        $log.debug('se dispara la funcion que recibe como callback, con el mensaje: ' + message.content);
    };

    $scope.$on('socket:connected',function(event,data){
        $scope.$apply(function(){
            $scope.message.author = data.nickName;
            $scope.messageLog.push(data);
        })
    });
    $scope.$on('socket:newUser', function(event,data){
        $scope.$apply(function () {
            $scope.messageLog.push(data);
        });
    });
    $scope.$on('socket:newMessage', function (event, data) {
        //$log.debug('got a message from: ', data.author);
        //$log.debug('event: ', event);
        $scope.$apply(function () {
            $scope.messageLog.push(data);
        });
    });

    $scope.$on('socket:newNick', function(event,data){
        $scope.$apply(function(){
            $scope.messageLog.push(data);
        })
    })
}]);