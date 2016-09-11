PollyApp.directive('hideTitle', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (scope.poll.Name.length > 20) {
                element.context.onmouseover = function (e) {
                    element.context.previousElementSibling.classList.remove('hide');
                    element.context.previousElementSibling.classList.add('show');
                }
                element.context.onmouseout = function (e) {
                    element.context.previousElementSibling.classList.remove('show');
                    element.context.previousElementSibling.classList.add('hide');
                }
                element.context.classList.add('hide-title');
            }
        }
    }
});