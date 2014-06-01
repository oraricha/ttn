'use strict';

angular.module('ttnApp')
	.controller('CmCtrl', ['$scope', '$http', function($scope, $http) {

		$http.get("../../data/cm.json").success(function(data) {
			// console.log(data);
			google.setOnLoadCallback(drawVisualization(data));
		});

		function drawVisualization(data) {
			var columns = data.result.columns;
			var chartArray = [];
			chartArray.push(columns);
			for (var i = 0; i < data.result.values.length; i++) {
				var row = data.result.values[i];
				chartArray.push(row);
			};
			var chartData = google.visualization.arrayToDataTable(chartArray);

			var options = {
			  title : 'data chart',
			  vAxis: {title: "Impressions"},
			  hAxis: {title: "Conversions"}
			};

			var chart = new google.visualization.LineChart(document.getElementById('chart-container'));
			chart.draw(chartData, options);
		}
	}]);
