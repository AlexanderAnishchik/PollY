PollyApp.controller('headerController', ['$scope', '$http', 'headerKeeperService', function ($scope, $http, headerKeeperService) {
    var me = this;
    me.login = null;
    me.registr = null;
    me.init = function () {
        $http.get("Account/GetUser", function (response) {
            debugger;
        },
          function (response) {

          });
    }
    me.signIn = function () {
        if (me.login.email && me.login.password) {
            $http.post("Login/SignIn", { login: me.login.email, pass: me.login.password }).then(function (response) {

                var data = response.data;
                if (data.status == true) {
                    $scope.user = data.user;

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
        else {
            //modal.open();
        }
    };
}]);