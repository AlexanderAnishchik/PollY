PollyApp.controller('dialogController', ['$scope', 'headerKeeperService', 'modalService', 'pollBuilderService', '$mdDialog', '$uibModal', function ($scope, headerKeeperService, modalService, pollBuilderService, $mdDialog, $uibModal) {
    var me = this;
    me.init = function () {

    };
    
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
    $scope.hide = function () {
        $mdDialog.hide();
    }
    $scope.saveToAccount = function (event) {
        pollBuilderService.save(function () {
            var modalObject = {
                title: "Link to poll",
                textContent: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                ariaLabel: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                event: event
            };
            modalService.showConfirm(modalObject, function () { window.location.href = "/"; }, function () { });

        }, function () { }, function () { });
            
    };
    $scope.openModalBt = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'loginregister.tmpl.html',
            controller: 'headerController',
            controllerAs: 'headCtrl'
        });
    };
}]);