PollyApp.controller('pollController', ['$scope', 'pollSettingsFactory', '$http', function ($scope, pollSettingsFactory, $http) {
    var me = this;
    $scope.data = null;
    me.init = function () {
        var pathArray = window.location.pathname.split('/');
        $http.post("/Constructor/GetPoll", { poll: pathArray[pathArray.length-1] }).then(function (response) {
            $scope.data = me.parseAnswer(response.data);
        })
        .then(function (response) {

        });
    };
    me.parseAnswer = function (data) {

        return data;
    };
}]);