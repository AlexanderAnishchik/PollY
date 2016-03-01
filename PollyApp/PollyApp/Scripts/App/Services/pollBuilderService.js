(function () {
    PollyApp.service("pollBuilderService", ["pollSettingsFactory","JSONService","modalService", "$http", function (pollSettingsFactory,JSONService,modalService, $http) {
        var self = this;
        self.isBuilder = false;
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
                answers: [{ value: null }, { value: null }]
            };
        }
        self.addBlock = function (last) {
            self.pollData.poll.push({
                question: { value: null },
                answers: [{ value: null }, { value: null }]
            });
        }
        self.saveCodeSet = function (codeSet) {
            self.pollData.CodeSet = codeSet;
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
        self.save = function (success) {
            var validPollArray = JSON.parse(JSON.stringify(self.pollData));
            var poll_length = validPollArray.poll.length;
            while (poll_length--) {
                if (validPollArray.poll[poll_length].question.value != null && validPollArray.poll[poll_length].question.value != "") {
                    var answer_status = true;
                    while (answer_status) {
                         answer_status = false;
                         for (var i = 0; i < validPollArray.poll[poll_length].answers.length; i++) {
                             if (validPollArray.poll[poll_length].answers[i].value == null || validPollArray.poll[poll_length].answers[i].value == "") {
                                 validPollArray.poll[poll_length].answers.splice(i, 1);
                                break;
                                answer_status = true;
                             }
                             else {
                                 validPollArray.poll[poll_length].answers[i] = JSON.stringify(validPollArray.poll[poll_length].answers[i]);
                             }
                        }
                    }

                }
            }
            debugger;
            $http.post("Constructor/SavePoll", { newPoll: validPollArray }).then(function (response) {
                success();
            }, function (response) {
                alert("Error on server/Is not signIn");
            });
        };
        self.converterAnswer = function (validPollArray) {

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