'use strict';

var app = require('../app');
var chartData = require('../data/cost-months/cost-february.json');

app.controller('costMonthController',['$scope', function ($scope) {

    $scope.costFebruary = chartData;

    $scope.weatherFebruary = [];
    var index;
    for (index = 0; index < chartData.series[0].data.length; ++index) {
        $scope.weatherFebruary.push(parseInt(chartData.series[0].data[index].temp));
    }

}]);
