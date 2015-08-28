'use strict';

var app = require('../app');
var chartData = require('../data/cost-day.json');

app.controller('costDayController',['$scope', function ($scope) {

    $scope.costDay = chartData;

    $scope.weatherDay = [];
    var index;
    for (index = 0; index < chartData.series[0].data.length; ++index) {
        $scope.weatherDay.push(parseInt(chartData.series[0].data[index].temp));
    }


}]);
