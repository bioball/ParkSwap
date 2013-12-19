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
				controller: 'whereIsController',
				templateUrl: 'client/views/rider/where.html'
			})
		.when('/wait',
			{
				controller: 'riderWaitController',
				templateUrl: 'client/views/rider/wait.html'
			})
		.when('/coming',
			{
				controller: 'riderComingController',
				templateUrl: 'client/views/rider/coming.html'
			})
		.otherwise({ redirectTo: '/' });
})