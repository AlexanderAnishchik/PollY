(function () {
    PollyApp.service("pollBuilderService", ["pollSettingsFactory", "JSONService", "modalService", "$http", function (pollSettingsFactory, JSONService, modalService, $http) {
        var self = this;
        self.pollData = {};
        self.lastSavedProject = null;
        self.pollData.poll = [];
        self.pollData.CodeSet = [];
        self.validPollArray = {};
        self.addAnswer = function (block) {
            block.answers.push({ value: "" });
        }

        self.deleteAnswer = function (block, index) {
            block.answers.splice(index, 1);
        }

        self.deleteQuestion = function (index) {
            self.pollData.poll.splice(index, 1);
        }
        self.initData = function () {
            self.pollData.PollName = null;
            self.pollData.PollType = 0;
            self.pollData.PollShare = 0;
            self.pollData.PollAccess = 0;
            self.pollData.poll = [];
            self.pollData.poll[0] = {
                question: { value: null },
                answers: [{ value: null }, { value: null }],
                questionType: 1
            };
        }
        self.addBlock = function (last) {
            self.pollData.poll.push({
                question: { value: null },
                answers: [{ value: null }, { value: null }],
                questionType: 1
            });
        }
        self.saveCodeSet = function (codeSet) {
            self.pollData.CodeSet = codeSet;
        }
        self.saveUserSet = function (userSet) {
            self.pollData.UserSet = userSet;
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
        self.validatePoll = function (next) {
            var hasError = false;
            self.validPollArray = JSON.parse(JSON.stringify(self.pollData));
            var poll_length = self.validPollArray.poll.length;
            while (poll_length--) {
                if (self.validPollArray.poll[poll_length].question.value != null && self.validPollArray.poll[poll_length].question.value != "") {
                    var answer_status = true;
                    while (answer_status) {
                        answer_status = false;
                        for (var i = 0; i < self.validPollArray.poll[poll_length].answers.length; i++) {
                            if (self.validPollArray.poll[poll_length].answers[i].value == null || self.validPollArray.poll[poll_length].answers[i].value == "") {
                                self.validPollArray.poll[poll_length].answers.splice(i, 1);
                                answer_status = true;
                                break;
                            }
                            else {
                                self.validPollArray.poll[poll_length].answers[i] = JSON.stringify(self.validPollArray.poll[poll_length].answers[i]);

                            }
                        }
                        if (self.validPollArray.poll[poll_length].answers < 2) {
                            self.validPollArray.poll.splice(poll_length, 1);
                            hasError = true;
                            var answer_status = false;
                        }
                    }
                } else {
                    hasError = true;
                    self.validPollArray.poll.splice(poll_length, 1);
                }

            }
            if (self.validPollArray.poll.length < 2 || hasError == true) {
                var error = "In this type of poll must be more then 1 question";
                return next(error, null);
            }
            return next(null, self.validPollArray);
        };
        self.save = function (success, serverError) {
            $http.post("Constructor/SavePoll", { configPoll: self.validPollArray, poll: self.validPollArray.poll }).then(function (response) {
                self.lastSavedProject = response.data.UrlCode;
                success();
            }, function (response) {
                serverError();
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