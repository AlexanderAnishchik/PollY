﻿(function () {
    PollyApp.service("modalService", [ "$mdDialog", function ($mdDialog) {
        var self = this;
        self.data = {};

        self.showConfirm = function (object, success, cancel) {
            var confirm = $mdDialog.confirm()
               .title(object.title)
               .textContent(object.textContent)
               .ariaLabel(object.ariaLabel)
               .targetEvent(object.event)
               .ok('Ok')
               .cancel('Cancel');
            $mdDialog.show(confirm).then(success,
                cancel);
        };
        self.showAlert = function (object) {
            var alert = $mdDialog.alert()
               .title(object.title)
               .textContent(object.textContent)
               .ariaLabel(object.ariaLabel)
               .targetEvent(object.event)
               .ok('Ok')
            $mdDialog.show(alert).then(function () {

            }, function () {

            });
        };
        self.showCustomDialog = function (object, success, cancel) {
            var alert = $mdDialog.show({
                controller: object.controller,
                templateUrl: object.template,
                parent: angular.element(document.body),
                targetEvent: object.event,
                clickOutsideToClose: object.outerClose,
            }).then(success, cancel);
        }
    }]);
})();