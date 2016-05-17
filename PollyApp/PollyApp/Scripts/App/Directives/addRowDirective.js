PollyApp.directive('addrow', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(document).ready(function () {
                var elem = $(element);
                elem.on('click', function () {
                    console.log(elem.next());
                    elem.next().slideToggle(200);

                });
              
            });
        }
    }
});