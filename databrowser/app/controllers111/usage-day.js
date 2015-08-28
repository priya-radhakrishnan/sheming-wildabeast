'use strict';

var app = require('../app');
var chartData = require('../data/usage-day.json');

app.controller('usageDayController',['$scope', function ($scope) {

    $scope.usageDay = chartData;

}]);
