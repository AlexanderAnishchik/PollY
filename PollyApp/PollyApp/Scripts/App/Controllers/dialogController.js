PollyApp.controller('dialogController', ['$scope', 'headerKeeperService', 'modalService','pollBuilderService', '$mdDialog', function ($scope, headerKeeperService, modalService,pollBuilderService, $mdDialog) {
    var me = this;
    me.init = function () {

    };
    
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
    $scope.hide = function () {
        $mdDialog.hide();
    }
    $scope.openModalWithLink = function (event, modalObject) {
        
        var modalObject = {
            title: "Link to poll",
            textContent: window.location.origin + "/" + pollBuilderService.lastSavedProject,
            ariaLabel: window.location.origin + "/" + pollBuilderService.lastSavedProject,
            event: event
        };
        modalService.showConfirm(modalObject, function () { window.location.href = "/"; }, function () {
            $mdDialog.hide();
            var object = {
                controller: 'dialogController',
                template: 'pollsavetype.tmpl.html',
                outerClose: false,
                event: event
            };
            modalService.showCustomDialog(object, function () { }, function () { });
        })
    };
}]);