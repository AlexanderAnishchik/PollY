var AccountPolly = angular.module('AccountPolly', ['Polly','ngRoute', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'ngMaterial', 'ngAnimation', "highcharts-ng"]);

AccountPolly.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	//'$routeProvider', '$locationProvider'
    	
    	//$locationProvider.html5Mode({
    	//	enabled: true,
    	//	requireBase: true
    	//});

    	//$routeProvider
		//	.when('/home', {
		//	    	templateUrl: '/Content/partial/account_page/home/home.html',
		//	    	controller: 'accountController',
		//	    	controllerAs: 'mainCtrl',
		//	    	reloadOnSearch: false
		//	})
		//	.when('/polls', {
		//		templateUrl: '/Content/partial/account_page/polls/polls.html',
		//		controller: 'accountController',
		//		controllerAs: 'mainCtrl',
		//		reloadOnSearch: false
		//	})
		//	.otherwise({
		//		redirectTo: '/home'
		//	});

	/*($stateProvider, $urlRouterProvider)*/
    	$stateProvider
            .state('home', {
            	url: '/home',
            	templateUrl: '/Content/partial/account_page/home/home.html',
            	controller: 'accountController',
            	controllerAs: 'mainCtrl',
            	reloadOnSearch: false
            })
			.state('polls', {
				url: '/polls',
				templateUrl: '/Content/partial/account_page/polls/polls.html',
				controller: 'accountController',
				controllerAs: 'mainCtrl',
				reloadOnSearch: false
			});
    	$urlRouterProvider
            .otherwise('/home');
    }
]);