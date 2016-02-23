(function () {
    PollyApp.service("pollBuilderService", ["pollSettingsFactory","JSONService", "$http", function (pollSettingsFactory,JSONService, $http) {
        var self = this;
        self.pollData = {};
        self.pollData.poll = [];
        self.addAnswer = function (block) {
            block.answers.push({ value: "" });
        }
        self.deleteAnswer = function (block, index) {
            block.answers.splice(index, 1);
        }
        self.deleteQuestion = function (block, index) {
            self.pollData.poll.splice(index, 1);
        }
        self.testData = function () {
            self.pollData.PollType = 0;
            self.pollData.PollShare = 0;
            self.pollData.PollAccess = 0;
            self.pollData.poll[0] = {
                question: {value:null},
                answers: [{ value: null }]
            };
        }
        self.addBlock = function (last) {
            self.pollData.poll.push({
                question: { value: null },
                answers: [{ value: null }]
            });
        }
        self.setShare = function (share) {
            if (share && typeof share != "undefined") {
                if (pollSettingsFactory.PollShare.some(function (el) {
                   return el.value == share;
                })) {
                     self.pollData.PollShare = share;
                }

            }
        };
        self.save = function () {
            debugger;
            var poll_length = self.pollData.poll.length;
            var validPollArray = jQuery.extend({},self.pollData);
            validPollArray.poll = [];
            while (poll_length--) {
                if (self.pollData.poll[poll_length].question.value != null && self.pollData.poll[poll_length].question.value != "") {
                    var answer_status = true;
                    while (answer_status) {
                         answer_status = false;
                         for (var i = 0; i < self.pollData.poll[poll_length].answers.length; i++) {
                             if (self.pollData.poll[poll_length].answers[i].value == null || self.pollData.poll[poll_length].answers[i].value == "") {
                                self.pollData.poll[poll_length].answers.splice(i, 1);
                                break;
                                answer_status = true;
                            }
                        }
                    }
                    if (self.pollData.poll[poll_length].answers.length > 1) {
                        validPollArray.poll.push(self.pollData.poll[poll_length]);
                    }
                }
            }
            $http.post("Constructor/SavePoll", { newPoll: validPollArray }).then(function (response) {

            }, function (response) {

            });
        };
        self.setType = function (type) {
            if (type && typeof type != "undefined") {
                if (pollSettingsFactory.PollType.some(function (el) {
                   return el.value == type;
                })) {
                    self.pollData.PollType = type;
                }

            }
        };
        self.setAccess = function (access) {
            if (access && typeof access != "undefined") {
                if (pollSettingsFactory.PollAccess.some(function (el) {
                  return el.value == access;
                })) {
                    self.pollData.PollAccess = access;
                }

            }
        };
    }]);
})();