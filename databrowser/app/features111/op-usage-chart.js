'use strict';

var app = require('../app'),
    defaultOptions = require('../default-options').chartTheme(),
    _ = require('lodash');

require('../../js/vendor/highcharts/js/modules/drilldown.js');

app.directive('opUsageChart', function() {
    return {
        restrict: 'A',
        scope: {
            chartData: '=',
            chartDetails: '=',
            changeParentChart: '&'
        },
        link: function($scope, elem, attrs) {
            $scope.activePointIndex = 0;
            Highcharts.setOptions(defaultOptions);
            new Highcharts.Chart({
                chart: {
                    renderTo: elem[0],
                    type: 'area',
                    events: {
                        click: function() {
                            if ($scope.chartDetails.drilldown !== false) {
                                $scope.changeParentChart({chart: $scope.chartData.series[0].data[$scope.activePointIndex].link});
                            }
                        }
                    }
                },
                plotOptions: {
                    area: {
                        pointStart: 0
                    },
                    series: {
                        stickyTracking: false,
                        point: {
                            cursor: 'pointer',
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
                        return {
                            x : point.plotX - boxWidth/4,
                            y : this.chart.series[0].points[$scope.activePointIndex].plotY - boxHeight - 10
                        };
                    },
                    formatter: function() {
                        $scope.activePointIndex = this.points[0].series.data.indexOf(this.points[0].point);
                        var toolTipInfo = {
                            YOU_USAGE: this.points[0].point.y + ' kWh',
                            tooltipLink: ($scope.chartDetails.toolTipLinkText) ? '<div class="tooltip-link"><a>' + $scope.chartDetails.toolTipLinkText + '</a></div>' : null
                        };
                        var tooltip = _.template('<div class="tooltip-series-row"><div class="tooltip-center"><%= YOU_USAGE %></div></div><%= tooltipLink %>', toolTipInfo);
                        return tooltip;
                    }
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        step: $scope.chartDetails.steps
                    }
                },
                yAxis:  [
                    {
                        min: 0,
                        max: $scope.chartDetails.max,
                        tickInterval: $scope.chartDetails.interval,
                        labels: {
                            formatter: function() {
                                var x = this.value,
                                    y = x.toFixed($scope.chartDetails.decimals);
                                if (!this.isLast) {
                                    return y;
                                } else {
                                    return y + ' kWh';
                                }
                            }
                        }
                    }
                ],
                series: [                    {
                        name: "You",
                        data: $scope.chartData.series[0].data,
                        lineWidth: 0,
                        fillColor: defaultOptions.neighborSettings['YOU'].fillColor,
                        showInLegend: false
                    },
                    {
                        color: defaultOptions.neighborSettings['YOU'].lineColor,
                        legendIndex: 0,
                        name: "You",
                        data: $scope.chartData.series[0].data,
                        lineWidth: 4,
                        fillColor: 'rgba(0,0,0,0)'
                    },
                    {
                        name: 'All Neighbors',
                        data: $scope.chartData.series[1].data,
                        lineWidth: 0,
                        color: defaultOptions.neighborSettings['NEIGHBORS'].lineColor,
                        legendIndex: 2,
                        visible: false
                    },
                    {
                        name: 'Efficient Neighbors',
                        data: $scope.chartData.series[2].data,
                        lineWidth: 0,
                        color: defaultOptions.neighborSettings['EFFICIENT_NEIGHBORS'].lineColor,
                        legendIndex: 1,
                        visible: false
                    }

                ]
            });
        }
    };
});
