PollyApp.controller('pollController', ['$scope', 'pollSettingsFactory', 'modalService', '$http', function ($scope, pollSettingsFactory, modalService, $http) {
    var me = this;
    $scope.data = null;
    me.result = [];
    me.init = function () {
        var pathArray = window.location.pathname.split('/');
        $http.post("/Constructor/GetPoll", { poll: pathArray[pathArray.length - 1] }).then(function (response) {
            $scope.data = me.parseAnswer(response.data);
            if ($scope.data.QuizConfig) {
                me.startTimer($scope.data.QuizConfig);
            }
        })
        .then(function (response) {

        });
    };
    me.startTimer = function (data) {
        $http.post("/Constructor/SetTimer", { poll: pathArray[pathArray.length - 1] }).then(function (response) {
            //data.Timer - time in minutes
            //StartTimer
        }, function (err) {

        });
    };
    me.endTimer = function () {
        

    };
    me.isVote = false;
    me.save = function (event) {
        debugger;
        var sendData = me.prepareData();
   var modalObject = {
            title: "Thank you!",
            textContent: "Your answers have been saved.",
            ariaLabel: "Your answers have been saved.",
            event: event
        };

        modalService.showConfirm(modalObject, function () {
            me.isVote = true;
            window.location.href = "/";
        },
        function () {
            me.isVote = true;
            window.location.href = "/";
        });
  
     $http.post("/Constructor/SaveResults", { poll: { PollResultQuestions: sendData } }).then(function (response) {
            alert("Success");
            $scope.data = me.parseAnswer(response.data);
        })
       .then(function (response) {
           alert("Error");
       });
    };
    me.prepareData = function () {
        var finishData = [];
        for (var qw in me.result) {
            var quest = { Id: qw };
            quest.Answers = [];
            for (var an in me.result[qw]) {
                if (me.result[qw][an])
                quest.Answers.push(me.result[qw][an]);
            }
            finishData.push(quest);
        }
        return finishData;
    };
    me.parseAnswer = function (data) {
        data.Questions.forEach((el, i) => {
            me.result[el.Question.Id] = {};
            el.Answers.forEach((an, z) => {
                data.Questions[i].Answers[z].Value = JSON.parse(an.Value).value;
            });
        });
        return data;
    };
 } ]);