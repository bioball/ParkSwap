angular.module('appModule')

.config(function($routeProvider) {
	$routeProvider
		.when('/',
			{
				controller: 'mainController',
				templateUrl: 'client/views/main.html'
			})
		.when('/login',
			{
				controller: 'loginController',
				templateUrl: 'client/views/login.html'
			})
		.when('/list',
			{
				controller: 'parkerListController',
				templateUrl: 'client/views/parker/list.html'
			})
		.when('/pickUpRider',
			{
				controller: 'parkerPickUpController',
				templateUrl: 'client/views/parker/pickUp.html'
			})
		.when('/whereIs',
			{
				controller: 'whereIs',
				templateUrl: 'client/views/rider/where.html'
			})
		.when('/wait',
			{
				controller: 'riderWait',
				templateUrl: 'client/views/rider/wait.html'
			})
		.when('/coming',
			{
				controller: 'coming',
				templateUrl: 'client/views/rider/coming.html'
			})
		.otherwise({ redirectTo: '/' });
};