PollyApp.controller('headerController', ['$scope', '$http', '$window', 'headerKeeperService', function ($scope, $http, $window, headerKeeperService) {
    var me = this;
    me.login = null;
    me.registr = null;
    $scope.RegisterModalShowState = false;
    $scope.headerData = headerKeeperService.data;
    me.init = function () {

        $http.get("Account/GetUser").then(function (response) {
         
            headerKeeperService.data.user = response.data;
        },
          function (response) {

          });
    }
    $scope.passwordConfirmation = false;
    $scope.checkPasswordConfirmation = function () {
        if (me.registr.pass!=me.registr.confirmpass) {
            $scope.passwordConfirmation = true;
        }
        if (me.registr.pass == me.registr.confirmpass) {
            $scope.passwordConfirmation = false;
        }
        
    }
    me.signIn = function () {
        if (me.login.email && me.login.password) {
            $http.post("Login/SignIn", { login: me.login.email, pass: me.login.password }).then(function (response) {

                var data = response.data;
                if (data.status == true) {
                    $scope.user = data.user;
                    $window.location.reload();
                }
            },
        function (response) {

        });
        }
    };
    me.signOut = function () {
        if (me.registr.first && me.registr.last && me.registr.email && me.registr.pass && me.registr.confirmpass && me.registr.pass == me.registr.confirmpass) {
            $http.post("Login/SignUp", { email: me.registr.email, pass: me.registr.pass, firstName: me.registr.first, lastName: me.registr.last }, function (response) {

            },
           function (response) {

           });
        }
        
    };

    
}]);