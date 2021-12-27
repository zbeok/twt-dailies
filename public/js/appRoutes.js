angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/about', {
			templateUrl: 'views/about.html',
			// controller: 'AboutController'
		})

		.when('/test', {
			templateUrl: 'views/test.html'//,
			// controller: 'ArchiveController'	
		})

		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
		})

		.when('/profile/:username', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
		})
  
      .otherwise('/');

	$locationProvider.html5Mode(true);

}]);