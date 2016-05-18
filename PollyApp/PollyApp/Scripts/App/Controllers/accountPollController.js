PollyApp.controller('accountPollController', ['$scope', '$http', 'headerKeeperService', function ($scope, $http, headerKeeperService) {
    var me = this;
    me.pollList = [];
    me.init = function () {
        me.getPollData();
    };
    me.getPollData = function () {
        $http.get("/ProjectManagment/GetUserPollInformation")
            .then(function (response) {
                if (response.data) {
                    me.updatePollList(response.data.userProject);
                }
            }, function (response) {

            });
    };
    me.updatePollList = function (data) {
        me.updateChartsList(data);
        me.pollList = data;
        
    };
    me.getUrl = function (urlCode) {
        return window.location.origin + "/poll/" + urlCode;
    }
    me.updateChartsList = function (data) {
        data.forEach(function (el, ind) {
            var dateV = el.DateVoters;
            if (dateV == null || dateV.length==0) {
                var showPicture = $("#chartBlock" + ind);
                return;
            }
            var result = [];
            dateV.forEach(function (el, ind) {
                var ob = [];
                ob.push(Date.UTC(el.date.y, el.date.m, el.date.d));
                ob.push(el.countVoters);
                result.push(ob);
            });
            data[ind].chart = {
                options: {
                    chart: {
                        type: 'area',
                        inverted: true,
                        height:200,
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of Voters'
                        },
                        min: 0,
                        yAxis: {
                            endOnTick: false,
                            maxPadding: 0
                        },
                    },
                  
                    title: {
                        text: null
                    },
                    loading: false
                },
                series: [{
                    data: result
                }],
            };
        });
       
    };
    me.deletePoll = function (id) {
        $http.post("/ProjectManagment/DeletePoll", { Id: id })
           .then(function (response) {
               if (response.data) {
                   me.getPollData();
               }
           }, function (response) {

           });
    }
    me.updateView = function (view) {
        headerKeeperService.data.accountView = view;
    };
    me.openPollResult = function (id) {
        headerKeeperService.data.accountView = '/Content/partial/account_page/polls/poll.html';
        headerKeeperService.data.pollId = id;
    }
   
}]);
