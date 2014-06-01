'use strict';

angular.module('ttnApp')
	.controller('MainCtrl', ['$scope', '$http', '$routeParams', '$q', '$window', function($scope, $http, $routeParams, $q, $window) {

		var getQuestions = function() {
			var deferred = $q.defer();
			if ($window.sessionStorage.getItem("questionsData") !== null) {
				var sessionDeferred = $q.defer();
				var sessionData = $window.sessionStorage.getItem("questionsData");
				sessionDeferred.resolve(JSON.parse(sessionData));
				return sessionDeferred.promise;
			}

			$http.get("../../data/data.json").success(function(questions) {
				$window.sessionStorage && $window.sessionStorage.setItem("questionsData", JSON.stringify(questions));
				deferred.resolve(questions);
			});

			return deferred.promise;
		};

		$scope.save = function() {
			$scope.questions[$routeParams.questionId - 1] = $scope.question;
			if ($window.sessionStorage) {
				$window.sessionStorage.setItem("questionsData", JSON.stringify($scope.questions));
			} else {
				console.log("no session storage support in this browser, sorry...")
			}
			// $http.post("../../data/data.json", JSON.stringify($scope.questions)).then(function(data) {
			// 	console.log("saved");
			// 	console.log(data);
			// })
		};


		$scope.questionId = parseInt($routeParams.questionId);

		getQuestions().then(function(questions) {
			$scope.questions = questions;
			$scope.question = $scope.questions[$routeParams.questionId - 1];
		});

		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	}]);
