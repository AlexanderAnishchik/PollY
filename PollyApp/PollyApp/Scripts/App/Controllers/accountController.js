PollyApp.controller('accountController', ['$scope', '$http', 'headerKeeperService', function ($scope, $http, headerKeeperService) {
    var me = this;
    me.init = function () {
        me.getPollinformation();
    };
    me.getPollinformation = function () {
        $http.get("/Account/GetUserPollInformation")
            .then(function (response) {
                debugger;
                if (response.data)
                    me.setPollInf(response.data.userProject, response.data.votedProject, response.data.answerProjects);
            }, function (response) {

            });
        me.setPollInf = function (userProject, votedProject, answerProjects) {
            var allPoll = userProject.length;
            me.activePollCount = userProject.filter(function (x) { return x.IsActive == true }).length;
            me.activePollPercent = Math.ceil(me.activePollCount / allPoll * 100);
            me.votersCount = votedProject;
            me.answerProjects = answerProjects;
            me.lastProjectName = userProject[userProject.length-1].Name;
        }
    }
    me.currentTab = "/Content/partial/account_page/home/home.html"
}]);