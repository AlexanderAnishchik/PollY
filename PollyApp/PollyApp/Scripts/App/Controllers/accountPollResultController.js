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
    me.updateQuestions = function (data) {
        me.chartTheme();
        data.forEach(function (el, ind) {
            var result = [];
            el.Answers.forEach(function (el, ind) {
                var ob = [];
                ob.push(JSON.parse(el.Value).value);

                ob.push(el.CountVoted);
                result.push(ob);
            });
            data[ind].chart = {
                options: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        type: 'category',

                    },
                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        title: {
                            text: 'Answers rate (vote)'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
                            }
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                style: {
                                    textShadow: '0 0 3px black'
                                }
                            }
                        }
                    },

                },
                series: [{
                    name: 'Answers',
                    data: result,

                }]
            };
        });
    }
    me.chartTheme = function () {
        Highcharts.theme = {
            colors: ["#17b092", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: null,
                style: {
                    fontFamily: "Signika, serif"
                }
            },
            title: {
                style: {
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                style: {
                    color: 'black'
                }
            },
            tooltip: {
                borderWidth: 0
            },
            legend: {
                itemStyle: {
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                }
            },
            plotOptions: {
                series: {
                    shadow: true
                },
                candlestick: {
                    lineColor: '#404048'
                },
                map: {
                    shadow: false
                }
            },

            // Highstock specific
            navigator: {
                xAxis: {
                    gridLineColor: '#D0D0D8'
                }
            },
            rangeSelector: {
                buttonTheme: {
                    fill: 'white',
                    stroke: '#C0C0C8',
                    'stroke-width': 1,
                    states: {
                        select: {
                            fill: '#D0D0D8'
                        }
                    }
                }
            },
            scrollbar: {
                trackBorderColor: '#C0C0C8'
            },

            // General
            background2: '#E0E0E8'

        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
    };
    me.init = function () {
        $http.post("/ProjectManagment/GetPollDataById", { id: $scope.headerData.pollId })
            .then(function (response) {
                me.project = response.data.Project;
                me.project.ModifiedOn = $scope.parseToDate(me.project.ModifiedOn);
                me.questionList = response.data.Questions;
                me.updateQuestions(me.questionList);

            }, function (response) {

            });
    };

}]);
