(function () {
    PollyApp.factory("answerTypeFactory", function () {
        //Text Answer
        var Text = {
            text: null
        }
        //get method
        var getTextAnswer = function () {
            return Text;
        }
        return {
            getTextAnswer: getTextAnswer
        };
    });
})();