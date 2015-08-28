'use strict';

var app = require('../app'),
    Highcharts = require('Highcharts');

app.controller('overTimeGraphController',['$scope', '$http', 'barGraphService', '$timeout', function ($scope, $http, barGraphService, $timeout) {

    $scope.activeChart = 'cost-current-year';
    $scope.activeCategory = 'costs';
    $scope.activeDay = "";
    $scope.nextDay = "";
    $scope.previousDay = "";
    $scope.hackHistory = [];
    $scope.showWeather = true;
    $scope.chartControlsOpen = false;
    $scope.months = require('../data/usage-current-year.json').series[0].data;
    $scope.fucker = 'cost-february';
    $scope.quietDropdownIsOpen = false;

    $scope.monthTraverse = function(i, cat, direction) {
        if (direction == 'back') {
            var previousMonth = (i-1 >= 0)? $scope.months[i-1].slug : $scope.months[$scope.months.length-1].slug;
            return cat + '-' + previousMonth;
        } else {
            var nextMonth = (i+1 <= $scope.months.length-1)? $scope.months[i+1].slug : $scope.months[0].slug;
            return cat + '-' + nextMonth;
        }
    };

    $scope.changeChart = function(chart) {
        $scope.activeChart = chart;
    };

    $scope.changeChartCategory = function(category) {
        $scope.activeCategory = category;
    };

    $scope.changeChartFromWithin = function(chart) {
        $scope.$apply(function(){
            $scope.activeChart = chart;
        });
    };

    $scope.toggleChartsControl = function() {
        if ($scope.chartControlsOpen) {
            $scope.chartControlsOpen = false;
        } else {
            $scope.chartControlsOpen = true;
        }
    };

    $scope.goBack = function(chart) {
        $scope.activeChart = chart;
    };

    $scope.updateActiveDay = function(day, nextDay, previousDay, pushToHistory) {
        $scope.activeDay = day;
        $scope.nextDay = nextDay;
        $scope.previousDay = previousDay;
        if (pushToHistory) {
            $scope.hackHistory.push($scope.activeChart);
        }
    };

    $scope.changeChartView = function(view) {
        $scope.activeChart = view;
    };

    $scope.quietDropdownOpen = function() {
        $scope.quietDropdownIsOpen = true;
    };

    $scope.quietDropdownClose = function() {
        $scope.quietDropdownIsOpen = false;
    };

}]);
