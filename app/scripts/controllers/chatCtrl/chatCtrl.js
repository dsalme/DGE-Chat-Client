/**
 * Created by dsalmeron on 07/05/14.
 */

app.controller('ChatCtrl', ['$scope','socketService', function($scope, socketService){
    $scope.nickName = "";
    $scope.message = {
        author: $scope.nickName,
        content: ""
    };
    $scope.messageLog = [];

    $scope.sendMessage = function(message){
        var splitted = message.content.split(" ");
        if(splitted[0] == "/nickname"){
            $scope.nickName = "";
            for(var i = 1; i < splitted.length; i++){
                $scope.nickName += splitted[i];
                $scope.message.content = "";
            }
        }else {
            //$scope.messageLog.push(message);
            socketService.emit('messages/createMessage', message, $scope.addMessage());
            $scope.message.content = "";
        }
    };

    $scope.addMessage = function(message){
        $scope.messageLog.push(message);
    }
}]);