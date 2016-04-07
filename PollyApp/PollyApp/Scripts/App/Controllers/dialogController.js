PollyApp.controller('dialogController', ['$scope', 'headerKeeperService', 'modalService', 'pollBuilderService', '$mdDialog', '$uibModal', 'recoveryService', function ($scope, headerKeeperService, modalService, pollBuilderService, $mdDialog, $uibModal, recoveryService) {
    var me = this;
    me.init = function () {

    };
    
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
    $scope.hide = function () {
        $mdDialog.hide();
    }
    $scope.openModalBt = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'loginregister.tmpl.html',
            controller: 'headerController',
            controllerAs: 'headCtrl'
        });
        headerKeeperService.data.modalInstance = modalInstance;
    };
    
    $scope.saveToAccount = function (event) {
        if (headerKeeperService.data.user) {
            pollBuilderService.save(function () {
                var modalObject = {
                    title: "Link to poll",
                    textContent: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                    ariaLabel: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                    event: event
                };
                modalService.functions.clearPollData(true);
                modalService.showConfirm(modalObject, function () { window.location.href = "/";  }, function () { });

            }, function () {
                var modalObject = {
                    title: "Error",
                    textContent: "Sorry, server have not done your request. Try again",
                    ariaLabel: "Error",
                    event: event
                }
                modalService.showAlert(modalObject, function () { });
            });
        }
        else {
            $scope.openModalBt();
        }
       
            
    };
    
}]);