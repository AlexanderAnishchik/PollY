PollyApp.controller('accountPollResultController', ['$scope', '$http', 'headerKeeperService', function ($scope, $http, headerKeeperService) {
    var me = this;
    $scope.headerData = headerKeeperService.data;
    me.project = {};
    me.questionList = [];
    $scope.parseToDate = function (string) {
        var newstring = "";
        for (var i = 0; i < string.length; i++) {
            parseInt(string[i]);
            if (!isNaN(string[i]) && string[i] != " ") {
                newstring += string[i];
            }
        }
        var date = new Date(parseInt(newstring));
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        date = date.getDate() + " / " + "0" + (parseInt(date.getMonth()) + 1) + " / " + date.getFullYear() + " " + hours + ":" + minutes + " " + ampm;
        
        return date;
    }
    me.updateQuestions = function(data) {
        data.forEach(function (el, ind) {
            data[ind].chart = {
                options: {
                    chart: {
                        type: 'area',
                        inverted: true,
                        height: 200,
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
                    data: [3, 0, 3, 0, 12, 1, 2],
                    pointStart: Date.UTC(2016, 10, 5),
                    pointInterval: 24 * 3600 * 1000 // one day
                }],
            };
        });
    }
    me.init = function () {
        $http.post("/ProjectManagment/GetPollDataById", {id:$scope.headerData.pollId})
            .then(function (response) {
                me.project = response.data.Project;
                me.project.ModifiedOn = $scope.parseToDate(me.project.ModifiedOn);
                me.questionList = response.data.Questions;
                me.updateQuestions(me.questionList);
                
            }, function (response) {

            });
    };
    
}]);
