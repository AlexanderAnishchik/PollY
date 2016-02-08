﻿(function () {
    PollyApp.service("pollBuilderService", ["pollSettingsFactory", "$http", function (pollSettingsFactory, $http) {
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

            $http.post("Constructor/SavePoll", { newPoll: self.pollData }).then(function (response) {

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