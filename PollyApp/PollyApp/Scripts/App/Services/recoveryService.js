(function () {
    PollyApp.service("recoveryService", [ function () {
        var self = this;
        self.setRecoveryPollData = function (data) {
            if (localStorage != null) {
                localStorage.setItem('poll', JSON.stringify(data));
            }
        };
        self.getRecoveryPollData = function () {
            var data = localStorage.getItem('poll');
            if (data == null)
                return null;
            return JSON.parse(data);
        };
        self.clearRecoveryPollData = function () {
            return localStorage.removeItem('poll');
        };
    }]);
})();