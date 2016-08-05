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
        me.addPropertyIsHide(false, me.pollList);
        
    };
    me.addPropertyIsHide = function (value, array) {
        for (var i = 0; i < array.length; i++) {
            array[i].isHide = value;
        }
    }
    me.getUrl = function (urlCode) {
        return window.location.origin + "/poll/" + urlCode;
    }
    me.updateChartsList = function (data) {
        me.chartTheme();
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

    me.chartTheme = function () {
        Highcharts.theme = {
            colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: "'Unica One', sans-serif"
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#B0B0B3'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },

            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },

            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },

            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            },

            // special colors for some of the
            legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            background2: '#505053',
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3)'
        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
    }
}]);
