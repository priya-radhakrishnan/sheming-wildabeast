'use strict';

var app = require('../app'),
    defaultOptions = require('../default-options').chartTheme(),
    _ = require('lodash');

require('../../js/vendor/highcharts/js/modules/drilldown.js');

app.directive('opCostChart', function() {
    return {
        restrict: 'A',
        scope: {
            chartData: '=',
            chartDetails: '=',
            weather: '=',
            changeParentChart: '&'
        },
        link: function($scope, elem, attrs) {

            Highcharts.setOptions(defaultOptions);
            new Highcharts.Chart({
                chart: {
                    renderTo: elem[0],
                    type: 'column',
                    events: {
                        click: function() {
                            if ($scope.chartDetails.drilldown !== false) {
                                $scope.changeParentChart({chart: $scope.chartData.series[0].data[$scope.activePointIndex].link});
                            }
                        }
                    }
                },
                plotOptions: {
                    series: {
                        stickyTracking: false,
                        point: {
                            events: {
                                click: function() {
                                    var chart = $scope.chartData.series[0].data[this.index].link;
                                    if (chart) {
                                        $scope.changeParentChart({chart: chart});
                                    }
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    positioner: function(boxWidth, boxHeight, point) {
                        var i = $scope.activePointIndex,
                            chart = this.chart,
                            pointX = (chart.plotSizeX - point.plotX > boxWidth/2)? point.plotX - 73 : chart.plotSizeX - boxWidth/2,
                            highestPointY = Math.min(
                                chart.series[0].points[i].plotY,
                                chart.series[1].points[i].plotY
                            );
                        return {
                            x : point.plotX - boxWidth/4,
                            y : highestPointY - boxHeight - 5
                        };
                    },
                    formatter: function() {
                        $scope.activePointIndex = this.points[0].series.data.indexOf(this.points[0].point);
                        var insight = this.points[0].point.insight,
                            insightIcon = (insight && insight.disposition == 'positive')? 'circle-check' : 'circle-warn';
                        var toolTipInfo = {
                            HEADER: (insight) ? '<div class="tooltip-header"><svg class="icon" viewBox="0 0 80 80"><use xlink:href="#' + insightIcon + '"></use></svg>' + insight.message  + '</div>' : null,
                            YOU_COSTS: '$' + this.points[0].point.y.toFixed($scope.chartDetails.decimals),
                            WEATHER: Math.round(this.points[1].point.y) + '°F',
                            tooltipLink: ($scope.chartDetails.toolTipLinkText) ? '<div class="tooltip-link"><a>' + $scope.chartDetails.toolTipLinkText + '</a></div>' : null
                        };
                        var tooltip = _.template('<%= HEADER %><div><div class="tooltip-series-row"><div class="tooltip-left"><%= YOU_COSTS %></div><div class="tooltip-right"><%= WEATHER %></div></div><%= tooltipLink %>', toolTipInfo);
                        return tooltip;
                    }
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        step: ($scope.chartDetails.steps)? $scope.chartDetails.steps : null
                    }
                },
                yAxis:  [
                    {
                        min: 0,
                        max: $scope.chartDetails.max,
                        tickInterval: $scope.chartDetails.interval,
                        labels: {
                            formatter: function() {
                                if (this.isFirst) {
                                    return '$' + this.value;
                                } else {
                                    var x = this.value,
                                        y = x.toFixed($scope.chartDetails.decimals);
                                    return '$' + y;
                                }
                            }
                        }
                    },
                    {
                        min: 0,
                        max: 120,
                        tickInterval: 30,
                        labels: {
                            enabled: false
                        }
                    }
                ],
                series: [
                    {
                        name: "Your Costs",
                        type: 'column',
                        data: $scope.chartData.series[0].data
                    },
                    {
                        name: 'Average Outdoor Temp (°F)',
                        data: $scope.weather,
                        type: 'line',
                        color: '#990099',
                        yAxis: 1,
                        dataLabels: {
                            align: 'center',
                            enabled: true,
                            format: '{y}°',
                            style: {
                                'color': '#990099',
                                'fontSize': 14,
                                'fontWeight': 'normal',
                                'textShadow': '0 1px 0 #cccccc'
                            },
                            y: -15,
                            verticalAlign: 'bottom'
                        }
                    }
                ]
            });
        }
    };
});
