(function () {
    PollyApp.service("pollBuilderService", ["pollSettingsFactory", function (pollSettingsFactory) {
        var self = this;
        self.pollData = {};
        self.pollData.poll = [];
        self.testData = function () {
            self.pollData.PollType = 1;
            self.pollData.PollShare = 1;
            self.pollData.PollAccess = 1;
            self.pollData.poll[0] = {
                question: "What did you do?",
                answers: ["ZXC", "cvbcvb", ""]
            };
            self.pollData.poll[1] = {
                question: "What did you do?",
                answers: ["ZXC", "cvbcvb", ""]
            };
            self.pollData.poll[2] = {
                question: "What did you do?",
                answers: ["ZXC", "cvbcvb", ""]
            };
        }
        self.setShare = function (share) {
            if (share && typeof share != "undefined") {
                if (pollSettingsFactory.PollShare.some(function (el) {
                    el.value == share;
                })) {
                    self.pollData.PollShare = share;
                }

            }
        };
        self.setType = function (type) {
            if (type && typeof type != "undefined") {
                if (pollSettingsFactory.PollType.some(function (el) {
                    el.value == type;
                })) {
                    self.pollData.PollType = type;
                }

            }
        };
        self.setAccess = function (access) {
            if (access && typeof access != "undefined") {
                if (pollSettingsFactory.PollAccess.some(function (el) {
                    el.value == access;
                })) {
                    self.pollData.PollAccess = access;
                }

            }
        };
    }]);
})();