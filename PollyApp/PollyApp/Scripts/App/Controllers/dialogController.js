PollyApp.controller('dialogController', ['$scope', 'headerKeeperService', 'modalService', '$mdDialog', function ($scope, headerKeeperService, modalService, $mdDialog) {
    var me = this;
    me.init = function () {

    };
    
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
    $scope.hide = function () {
        $mdDialog.hide();
    }
    $scope.openModalWithLink = function(event){
        
        var modalObject = {
            title: "Link to poll",
            textContent: "http://yourpolly.com/poll/1eR21ju",
            ariaLabel: "Poll / http://yourpolly.com/poll/1eR21ju",
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