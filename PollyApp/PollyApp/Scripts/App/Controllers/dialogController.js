PollyApp.controller('dialogController', ['$scope', 'headerKeeperService', 'pollBuilderService', '$mdDialog' , function ($scope, headerKeeperService, pollBuilderService, $mdDialog) {
    var me = this;
    me.init = function () {

    };
    
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
    $scope.hide = function () {
        $mdDialog.hide();
    }
}]);