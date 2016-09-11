var AccountPolly = angular.module('AccountPolly', ['Polly','ngRoute', 'ui.router', 'ngAnimate', 'ui.bootstrap', 'ngMaterial', 'ngAnimation', "highcharts-ng"]);

AccountPolly.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
			})
			.state('poll', {
				url: '/poll/:pollId',
				templateUrl: '/Content/partial/account_page/polls/poll.html',
				controller: 'accountController',
				controllerAs: 'mainCtrl',
				reloadOnSearch: false
			});
    	$urlRouterProvider
            .otherwise('/home');
    }
]);