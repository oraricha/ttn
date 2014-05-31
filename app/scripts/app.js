'use strict';

angular
	.module('ttnApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html'
			})
			.when('/features', {
				templateUrl: 'views/features.html'
			})
			.when('/contact', {
				templateUrl: 'views/contact.html'
			})
			.when('/question/:questionId', {
				templateUrl: 'views/question.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
