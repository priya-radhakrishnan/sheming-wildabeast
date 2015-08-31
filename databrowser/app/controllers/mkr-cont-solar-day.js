'use strict';

var app = require('../app');
var chartData = require('../data/mkr-data-solar-day.json');

app.controller('mkrSolarMonthController',['$scope', function ($scope) {

    $scope.mkrSolarDay = chartData;

}]);