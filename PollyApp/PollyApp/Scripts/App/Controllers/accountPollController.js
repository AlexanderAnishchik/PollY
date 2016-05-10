PollyApp.controller('accountPollController', ['$scope', '$http', 'headerKeeperService', function ($scope, $http, headerKeeperService) {
    var me = this;
    me.pollList = [];
    me.init = function () {
        me.getPollData();
    };
    me.getPollData = function () {
        $http.get("/Account/GetUserPollInformation")
            .then(function (response) {
                if (response.data) {
                    me.updatePollList(response.data.userProject)
                }
            }, function (response) {

            });
    };
    me.updatePollList = function (data) {
        me.pollList = data;
    };
    
    me.updateView = function (view) {
        headerKeeperService.data.accountView = view;
    };
   
}]);
