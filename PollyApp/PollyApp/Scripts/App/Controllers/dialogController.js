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
    me.saveToBuilderService = function (event) {
        pollBuilderService.save(true, function () {
            var modalObject = {
                title: "Link to poll",
                textContent: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                ariaLabel: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                event: event
            };
            modalService.functions.clearPollData(true);
            modalService.showConfirm(modalObject, function () { window.location.href = "/"; }, function () { });

        }, function () {
            var modalObject = {
                title: "Error",
                textContent: "Sorry, server have not done your request. Try again",
                ariaLabel: "Error",
                event: event
            }
            modalService.showAlert(modalObject, function () { });
        });
    };
    $scope.openModalBt = function (event,toAccount) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'loginregister.tmpl.html',
            controller: 'headerController',
            controllerAs: 'headCtrl'
        });
        if (toAccount) {
            modalInstance.result.then(function () {
                me.saveToBuilderService(event);
            });
        }
        headerKeeperService.data.modalInstance = modalInstance;
    };
    
    $scope.saveDataTo = function (event, toAccount) {
        if (toAccount)
        {
            if (headerKeeperService.data.user) {
                me.saveToBuilderService(event)
            }
            else
            {
                $scope.openModalBt(event,toAccount);
            }
        } else {
            pollBuilderService.save(false,function () {
                var modalObject = {
                    title: "Link to poll",
                    textContent: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                    ariaLabel: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
                    event: event
                };
                modalService.functions.clearPollData(true);
                modalService.showConfirm(modalObject, function () { window.location.href = "/"; }, function () { });

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
        //if (headerKeeperService.data.user) {
        //    pollBuilderService.save(function () {
        //        var modalObject = {
        //            title: "Link to poll",
        //            textContent: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
        //            ariaLabel: window.location.origin + "/poll/" + pollBuilderService.lastSavedProject,
        //            event: event
        //        };
        //        modalService.functions.clearPollData(true);
        //        modalService.showConfirm(modalObject, function () { window.location.href = "/";  }, function () { });

        //    }, function () {
        //        var modalObject = {
        //            title: "Error",
        //            textContent: "Sorry, server have not done your request. Try again",
        //            ariaLabel: "Error",
        //            event: event
        //        }
        //        modalService.showAlert(modalObject, function () { });
        //    });
        //}
        //else {
        //    $scope.openModalBt();
        //}
       
            
    };
    
}]);