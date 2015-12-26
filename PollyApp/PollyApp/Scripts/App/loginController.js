PollyApp.controller('loginController', ['$scope','$http',  function ($scope,$http) {
    var me = this;
    me.login = null;
    me.registr = null;
    $scope.user = null;
    me.signIn = function () {
        if (me.login.email && me.login.password) {
            $http.post("Login/SignIn", { login: me.login.email, pass: me.login.password }).then(function (response) {
                debugger;
                var data = response.data;
                if (data.status == true) {
                    $scope.user = data.user;
                    debugger;
                }
            },
            function (response) {

            });
        }
    };
    me.signOut = function () {
        if (me.registr.first && me.registr.last && me.registr.email && me.registr.pass && me.registr.confirmpass && me.registr.pass == me.registr.confirmpass) {
            $http.post("Login/SignUp", { email: me.registr.email, pass: me.registr.pass, firstName: me.registr.first, lastName: me.registr.last }, function (response) {
                debugger;
            },
            function (response) {
                
            });
        }
    };
}]);