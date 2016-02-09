PollyApp.controller('headerController', ['$scope', '$http', '$window', 'headerKeeperService','$interval', function ($scope, $http, $window, headerKeeperService,$interval) {
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
    };

    //===VALIDATION===
    $scope.passConfirm = true;
    $scope.checkPasswordConfirmation = function (first,second) {
        if (first.$viewValue == second.$viewValue)
            $scope.passConfirm = true;
        else
            $scope.passConfirm = false;
    };

    $scope.firstValid = true;
    $scope.secondValid = true;
    $scope.emailValid = true;
    $scope.passValid = true;
    $scope.checkValidation = function (input) {
        if(!input.$valid && !input.$pristline){
            if (input.$name == 'first') {
                $scope.firstValid = false;
            }
            else {
                if(input.$name == "last"){
                    $scope.secondValid = false;
                }
                else {
                    if (input.$name == "email") {
                        $scope.emailValid = false;
                    }
                    else {
                        if (input.$name == "pass") {
                            $scope.passValid = false;
                        }
                        else {
                            if (input.$name == "password") {
                                $scope.passValid = false;
                            }
                        }
                    }
                }
            }

        }
        else {
            if (input.$valid && !input.$pristline)
            {
                $scope.firstValid = true;
                $scope.secondValid = true;
                $scope.emailValid = true;
                $scope.passValid = true;
            }
        }
    };

    //===AUTHORIZATION===
    $scope.errorAuth = "";
    $scope.loader = false;
    me.signIn = function () {
        if (me.login.email && me.login.password) {
            $scope.loader = true;
            $http.post("Login/SignIn", { login: me.login.email, pass: me.login.password }).then(function (response) {
                if (response.data.status == true) {
                    $window.location.reload();
                }
                else {
                    $scope.loader = false;
                    $scope.errorAuth = "The login or password you’ve entered is incorrect. Forgot password?";
                    
                }
            },
        function (response) {

        });
        }
    };
    $scope.isRegister = false;
    me.signOut = function () {
        if (me.registr.first && me.registr.last && me.registr.email && me.registr.pass && me.registr.confirmpass && me.registr.pass == me.registr.confirmpass) {
            $http.post("Login/SignUp", { email: me.registr.email, pass: me.registr.pass, firstName: me.registr.first, lastName: me.registr.last }).then(function (response) {
                var data = response.data;
                if (data == true) {
                    $scope.isRegister = true;
                    setTimeout(function () {
                        $scope.isAuth = false;
                        $window.location.reload();
                    }, 2000);
                }

            },
           function (response) {

           });
        }
        
    };

    
}]);