'use strict';

var app = require('../app');
var chartData = require('../data/usage-months/usage-february.json');

app.controller('usageMonthController',['$scope', function ($scope) {

    $scope.usageFebruary = chartData;

}]);
