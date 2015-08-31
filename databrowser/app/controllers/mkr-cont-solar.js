'use strict';

var app = require('../app');
var chartData = require('../data/mkr-data-solar.json');

app.controller('mkrSolarController',['$scope', function ($scope) {

    $scope.mkrSolar = chartData;

}]);
