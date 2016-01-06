PollyApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
     .when('/ChooseAccess', {
         templateUrl: 'Content/partial/ChooseAccess.html',
         controller: 'constructorController'

     })
    .when('/ChooseType', {
        templateUrl: 'Content/partial/ChooseType.html',
        controller: 'constructorController'
    })
    .when('/ChoosePermission', {
        templateUrl: 'Content/partial/ChoosePermission.html',
        controller: 'constructorController'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
