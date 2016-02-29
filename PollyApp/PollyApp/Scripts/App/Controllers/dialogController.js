
PollyApp.controller('dialogController', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

    $scope.showConfirm = function (event) {
        var confirm = $mdDialog.confirm()
           .title('Error')
           .textContent('Question must be not null!')
           .ariaLabel('YourPolly.com')
           .targetEvent(event)
           .ok('Yes')
           .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {

        }, function () {

        });
    };
    
}]);