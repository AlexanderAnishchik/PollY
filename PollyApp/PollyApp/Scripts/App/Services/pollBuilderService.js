(function () {
    PollyApp.service("pollBuilderService", ["pollSettingsFactory", function (pollSettingsFactory) {
        var self = this;
        var pollData = {};
        self.setAccess = function (share) {
            if (share && typeof share != "undefined") {
                if(pollSettingsFactory.PollShare.some(function (el) {
                    el.value == share;
                })) {
                    pollData.PollShare = share;
                }
               
            }
        }
    }]);
})();