angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/register', {
			templateUrl: 'views/register.html'//,
			// controller: 'AboutController'
		})

// 		.when('/about', {
// 			templateUrl: 'views/about.html',
// 			controller: 'AboutController'
// 		})

		.when('/test', {
			templateUrl: 'views/test.html'//,
			// controller: 'ArchiveController'	
		})

		.when('/profile/:username', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
		})
		.when('/stats', {
			templateUrl: 'views/stats.html',
			controller: 'StatsController'
		})

// 		.when('/support', {
// 			templateUrl: 'views/support.html',
// 			controller: 'SupportController'	
// })
      .otherwise('/');

	$locationProvider.html5Mode(true);

}]);