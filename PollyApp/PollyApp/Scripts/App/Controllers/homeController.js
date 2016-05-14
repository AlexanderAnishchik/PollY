PollyApp.controller('homeController', ['$scope','$http', 'headerKeeperService', function ($scope, $http, headerKeeperService) {
    var me = this;
    me.init = function () {

    };
    me.feedback = {};
    $scope.feedbackMessage = "";
    $scope.feedbackStatus = null;
    me.sendFeedback = function () {
        if (me.feedback.firstname && me.feedback.lastname && me.feedback.email && me.feedback.title && me.feedback.message) {
            $http.post("/Home/SendEmail", { FirstName: me.feedback.firstname, LastName: me.feedback.lastname, Email: me.feedback.email, Title: me.feedback.title, Message: me.feedback.message }).then(function (response) {
                if (response.data.status) {
                    $scope.feedbackStatus = true;
                    $scope.feedbackMessage = "Your email have been sent. Our team will contact with you as soon as possible!";
                    setTimeout(function () {
                        $scope.feedbackStatus = null;
                    }, 3000);
                }
            },
       function (response) {
           $scope.feedbackStatus = false;
           $scope.feedbackMessage = "Sorry, server could not process your request! Try again.";
       });
        } else {
            $scope.feedbackStatus = false;
            $scope.feedbackMessage = "All fields are required! Try again.";
            setTimeout(function () {
                $scope.feedbackStatus = null;
            }, 3000);
            
        }
    };
}]);