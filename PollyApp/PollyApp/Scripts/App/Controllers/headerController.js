PollyApp.controller('headerController', ['$scope', '$http', '$window', 'headerKeeperService', '$interval', '$uibModal', function ($scope, $http, $window, headerKeeperService, $interval, $uibModal) {
    var me = this;
    me.login = null;
    me.registr = null;
    $scope.RegisterModalShowState = false;
    $scope.headerData = headerKeeperService.data;

    me.init = function () {
        $scope.headerData.accountView = '/Content/partial/account_page/home/home.html';
        $http.get("/Account/GetUser").then(function (response) {
            if (response.data != '') {
                headerKeeperService.data.isLogged = 1
                headerKeeperService.data.user = response.data;
                if (headerKeeperService.data.user.logo == null)
                    headerKeeperService.data.user.logo = "nophoto.png";
            }
        },
          function (response) {

          });
    };
    $scope.isModalOpened = false;
    $scope.openModalBt = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            controller: 'headerController',
            controllerAs: 'headCtrl',
            templateUrl: 'loginregister.tmpl.html'
        });
        headerKeeperService.data.modalInstance = modalInstance;

    };
    //===VALIDATION===
    $scope.passConfirm = true;
    $scope.checkPasswordConfirmation = function (first, second) {
        if (first.$viewValue == second.$viewValue)
            $scope.passConfirm = true;
        else
            $scope.passConfirm = false;
    };

    //===AUTHORIZATION===
    $scope.errorAuth = "";
    $scope.loader = false;
    me.signIn = function () {
        if (me.login.email && me.login.password) {
            $scope.loader = true;
            $http.post("/Login/SignIn", { login: me.login.email, pass: me.login.password }).then(function (response) {
                if (response.data.status == "OK") {
                    me.init();
                    $scope.loader = false;
                    headerKeeperService.data.modalInstance.close("");
                    //$window.location.reload();
                }
                else {
                    $scope.loader = false;
                    $scope.errorAuth = "The login or password you’ve entered is incorrect. Forgot password?";
                }

            },
        function (response) {
            $scope.loader = false;
            $scope.errorAuth = "Sorry, server could not process your request!";
        });
        }
        else {
            $scope.errorAuth = "Please enter all field";
        }
    };
    $scope.isRegister = "";
    me.signOut = function () {
        if (me.registr.first && me.registr.last && me.registr.email && me.registr.pass && me.registr.confirmpass && me.registr.pass == me.registr.confirmpass) {
            $http.post("Login/SignUp", { email: me.registr.email, pass: me.registr.pass, firstName: me.registr.first, lastName: me.registr.last }).then(function (response) {
                var data = response.data;
                if (response.status == 200) {
                    if (data == "Registration completed successfully") {
                        $scope.isRegister = "Registration completed successfully";
                        setTimeout(function () {
                            $window.location.reload();
                        }, 2000);
                    }
                    if (data == "Password or login you've entered is invalid") {
                        $scope.isRegister = "Password or login you have entered is invalid. Please try again.";
                    }
                    if (data == "User with this email already exist") {
                        $scope.isRegister = "User with this email already exist. Please try again with other email.";
                    }
                }
                else {
                    $scope.isRegister = "Sorry, but registration is not available at the moment! Please try again later";
                }
            },
           function (response) {

           });
        }

    };




}]);

