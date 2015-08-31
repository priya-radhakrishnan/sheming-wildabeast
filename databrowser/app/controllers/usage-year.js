'use strict';

var app = require('../app');
var chartData = require('../data/usage-current-year.json');

app.controller('usageYearController',['$scope', function ($scope) {

    $scope.usageYear = chartData;

}]);
