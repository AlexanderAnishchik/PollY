PollyApp.controller('accountController', ['$scope','$http', 'headerKeeperService', function ($scope,$http, headerKeeperService) {
    var me = this;
    me.init = function () {
        me.getPollinformation();
    };
    me.getPollinformation = function () {
        $http.get("/Account/GetUserPollInformation").then(function (response) {

        })
    }
    me.currentTab = "/Content/partial/account_page/home/home.html"
}]);