polly.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/Home/Home',
        controller: 'homeCtrl',
    });
    $routeProvider.when('/About', {
        templateUrl: '/Home/About',
        controller: 'aboutCtrl',
    });
    $routeProvider.when('/Contact', {
        templateUrl: '/Home/Contact',
        controller: 'contactCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(false).hashPrefix('!');

}])