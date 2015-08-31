'use strict';

var app = require('../app');
var chartData = require('../data/cost-months/mkr-data-solar-february.json');

app.controller('mkrSolarMonthController',['$scope', function ($scope) {

    $scope.mkrSolarMonth = chartData;

}]);