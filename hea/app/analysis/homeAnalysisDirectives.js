'use strict';

var ngApp = angular.module('app'),
    Highcharts = require('Highcharts'),
    _ = require('lodash');

ngApp.directive('opDisaggregationChart', function($timeout, $window) {

    return {
        restrict: 'A',
        scope: {
            disaggregationChart: '=',
            onSlice: '&',
            onOut: '&',
            pieSize: '='
        },
        link: function($scope, elem, attrs) {

            var buildChart = function () {
                var colorWheelPromise;

                new Highcharts.Chart({
                    exporting: {
                        enabled: false
                    },
                    chart: {
                        renderTo: elem[0],
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height: $scope.pieSize,
                        width: $scope.pieSize
                    },
                    plotOptions: {
                        pie: {
                            animation: false,
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            borderWidth: 0,
                            slicedOffset: 0,
                            states: {
                                hover: {
                                    brightness: 0,
                                    halo: false
                                }
                            },
                            events: {
                                mouseOut: function () {
                                    var self = this;
                                    var colorWheel = function () {
                                        _.forEach(self.points,function(point,index){
                                            point.graphic.attr({
                                                fill: $scope.disaggregationChart.chartColor[index]
                                            });

                                        });
                                        $scope.onOut({});
                                    }
                                    $timeout.cancel(colorWheelPromise);
                                    colorWheelPromise = $timeout(colorWheel,750);
                                }
                            }
                        }
                    },
                    title: {
                        text: null
                    },
                    legend: {
                        enabled: true
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        useHTML: true,
                        followPointer: false,
                        followTouchMove: false,
                        backgroundColor: '#FFFFFF',
                        borderWidth: 0,
                        positioner: function(boxWidth, boxHeight, point) {
                            var xVal = point.plotX - boxWidth/2 + 5;
                            var yVal = point.plotY - boxHeight - 10;
                            return { x: xVal, y: yVal };
                        },
                        formatter: function() {

                            // cancel out mouse out if it exists
                            $timeout.cancel(colorWheelPromise);

                            var self = this,
                                grayCounter = 0,
                                currentIndex = 0;

                            // color the slices
                            _.forEach(this.series.points,function(point,index){
                                if ( point === self.point ) {
                                    currentIndex = index;
                                    point.graphic.attr({
                                        fill: $scope.disaggregationChart.chartColor[index]
                                    });
                                } else {
                                    point.graphic.attr({
                                        fill: $scope.disaggregationChart.grayColor[grayCounter]
                                    });
                                    grayCounter++;
                                }
                            });
                            $scope.onSlice({index:currentIndex});

                            // create the tooltip
                            var tooltipInfo = {
                                HEADER: '<div class="tooltip-header"><span class="header-left">' + self.point.name + '</span><span class="header-right">' + self.y +'%</span></div>',
                                LINK: '<span class="tooltip-link"><a href="javascript:void(0)" class="button">' + $scope.disaggregationChart.insights[currentIndex].link + '</a></span>'
                            };
                            var tooltip = _.template('<%= HEADER %><%= LINK %>', tooltipInfo);
                            return tooltip;
                        }
                    },
                    colors: $scope.disaggregationChart.chartColor,
                    series: [{
                        type: 'pie',
                        name: $scope.disaggregationChart.graphTitle,
                        data: $scope.disaggregationChart.chartData
                    }]
                });
            };

            buildChart();
            $scope.$watch("pieSize",function(newValue,oldValue){
                if ( newValue !== oldValue ) {
                    buildChart();
                }
            });

        }
    };
});
