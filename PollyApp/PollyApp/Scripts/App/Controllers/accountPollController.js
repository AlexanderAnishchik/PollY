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
    me.updateChartsList = function (data) {
        data.forEach(function (el, ind) {
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
                        dateTimeLabelFormats: {
                            day: '%e %b'
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
                    name: 'Voters',
                    data: [3, 0, 3, 0,12, 1, 2],
                    pointStart: Date.UTC(2016, 10, 5),
                    pointInterval: 24 * 3600 * 1000 // one day
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
   
}]);
