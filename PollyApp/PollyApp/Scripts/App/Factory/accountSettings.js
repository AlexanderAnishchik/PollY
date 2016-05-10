(function () {
    PollyApp.factory("accountSettingsFactory", function () {
        //Text Answer
       
        return {
            templates: [
                {
                    title: 'Home',
                    template: '/Content/partial/account_page/home/home.html'
                },
                {
                    title: 'Polls',
                    template: '/Content/partial/account_page/polls/polls.html'
                }
            ]
        };
    });
})();