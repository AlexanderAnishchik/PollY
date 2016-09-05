PollyApp.controller('pollController', ['$scope', 'pollSettingsFactory', 'modalService', '$http', function ($scope, pollSettingsFactory, modalService, $http) {
    var me = this;
    $scope.data = null;
    $scope.valid = true;
    $scope.saved = false;
    me.result = [];
    me.init = function () {
        var pathArray = window.location.pathname.split('/');
        $http.post("/Constructor/GetPoll", { poll: pathArray[pathArray.length - 1] }).then(function (response) {
            $scope.data = me.parseAnswer(response.data);
            if (!_.isEmpty($scope.data.QuizConfig)) {
                me.startTimer($scope.data.QuizConfig);
            }
        })
        .then(function (response) {

        });
    };

    me.startTimer = function (data) {
        var timerlength = document.querySelector('.timer').clientWidth;
        var row_timer = document.querySelector('.row-timer');
        var pixels = (timerlength / (data * 60)) / 10;
        pixels = parseFloat(pixels.toFixed(3));
        row_timer.style.width = "1px";
        var timer = setInterval(function () {
            row_timer.style.width = row_timer.clientWidth + pixels + "px";
            if (row_timer.clientWidth >= timerlength) {
                clearInterval(timer);
            }
        },100);

    };
    me.endTimer = function () {
        
    };
    me.isVote = false;
    me.save = function (event) {
		//prevent second click
    	me.isVote = true;

    	var sendData = me.prepareData();
		//if preparing data detected something wrong (Modal popups in callback)
    	if (!$scope.valid) return;

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
  
        $http.post("/Constructor/SaveResults", { poll: { PollResultQuestions: sendData }, project: $scope.data.Project }).then(function (response) {
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

			//if chackbox
            if (!_.isEmpty(me.result[qw]))
				for (var an in me.result[qw]) {
					if (me.result[qw][an])
						quest.Answers.push(me.result[qw][an]);
				}
        	//if radiobutton or 1 checkbox selected 
            if (_.isInteger(me.result[qw]))
            	quest.Answers.push(me.result[qw]);

            if (quest.Answers.length == 0) {
            	$scope.valid = false;

            	var modalObject = {
            		title: "Attention!",
            		textContent: "No answer have been chosen.",
            		ariaLabel: "No answer have been chosen."
            		//event: event
            	};
				//if some troubles heppens the Save button is enable again
            	modalService.showAlert(modalObject, function () {
            		me.isVote = false;
            	}, function () {
            		me.isVote = false;
            	});
            	return;
            }
			else
				finishData.push(quest);
        }
        $scope.valid = true;
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