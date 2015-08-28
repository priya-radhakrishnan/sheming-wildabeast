'use strict';

var app = require('../app');
var chartData = require('../data/cost-current-year.json');

app.controller('costYearController',['$scope', function ($scope) {

    $scope.costYear = chartData;

    $scope.weatherYear = [];
    var index;
    for (index = 0; index < chartData.series[0].data.length; ++index) {
        $scope.weatherYear.push(parseInt(chartData.series[0].data[index].temp));
    }

}]);
