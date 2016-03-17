PollyApp.controller('pollController', ['$scope', 'pollSettingsFactory', '$http', function ($scope, pollSettingsFactory, $http) {
    var me = this;
    $scope.data = null;
    me.result = [];
    me.init = function () {
        var pathArray = window.location.pathname.split('/');
        $http.post("/Constructor/GetPoll", { poll: pathArray[pathArray.length - 1] }).then(function (response) {
            $scope.data = me.parseAnswer(response.data);
        })
        .then(function (response) {

        });
    };
    me.save = function () {
        debugger;
        var sendData = me.prepareData();
    };
    me.prepareData = function () {
        var finishData = [];
        for (var qw in me.result) {
            var quest = { Id: qw };
            for (var an in me.result[qw]) {
                quest.Answers = [];
                quest.Answers.push(an);
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
}]);