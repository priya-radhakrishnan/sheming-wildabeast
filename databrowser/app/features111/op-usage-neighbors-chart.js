'use strict';

var app = require('../app'),
    defaultOptions = require('../default-options').chartTheme(),
    _ = require('lodash');

require('../../js/vendor/highcharts/js/modules/drilldown.js');

app.directive('opUsageNeighborsChart', function() {
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
                        stickyTracking: true,
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
                        var i = $scope.activePointIndex,
                            chart = this.chart,
                            highestPointY = Math.min(
                                chart.series[0].points[i].plotY,
                                chart.series[1].points[i].plotY,
                                chart.series[2].points[i].plotY
                            );
                        return {
                            x : point.plotX - boxWidth/4,
                            y : highestPointY - boxHeight - 10
                        };
                    },
                    formatter: function() {
                        $scope.activePointIndex = this.points[0].series.data.indexOf(this.points[0].point);
                        var insight = this.points[0].series.chart.series[5].data[$scope.activePointIndex].insight,
                            insightIcon = (insight && insight.disposition == 'positive')? 'smiley-great' : (insight && insight.disposition == 'neutral')? 'smiley-good' : 'circle-warn';
                        var toolTipInfo = {
                            HEADER: (insight) ? '<div class="tooltip-header"><svg class="icon" viewBox="0 0 80 80"><use xlink:href="#' + insightIcon + '"></use></svg>' + insight.message  + '</div>' : null,
                            YOU_USAGE: Math.round(this.points[2].point.y) + ' kWh',
                            tooltipLink: ($scope.chartDetails.toolTipLinkText) ? '<div class="tooltip-link"><a>' + $scope.chartDetails.toolTipLinkText + '</a></div>' : null
                        };
                        var tooltip = _.template('<%= HEADER %><div><div class="tooltip-series-row"><div class="tooltip-center"><%= YOU_USAGE %></div></div><%= tooltipLink %>', toolTipInfo);
                        return tooltip;
                    }
                },
                xAxis: {
                    type: 'category'
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
                series: [
                    {
                        name: 'All Neighbors',
                        data: $scope.chartData.series[1].data,
                        lineWidth: 0,
                        fillColor: defaultOptions.neighborSettings['NEIGHBORS'].fillColor,
                        showInLegend: false
                    },
                    {
                        name: 'Efficient Neighbors',
                        data: $scope.chartData.series[2].data,
                        lineWidth: 0,
                        fillColor: defaultOptions.neighborSettings['EFFICIENT_NEIGHBORS'].fillColor,
                        showInLegend: false
                    },
                    {
                        name: "You",
                        data: $scope.chartData.series[0].data,
                        lineWidth: 0,
                        fillColor: defaultOptions.neighborSettings['YOU'].fillColor,
                        showInLegend: false
                    },
                    {
                        color: defaultOptions.neighborSettings['NEIGHBORS'].lineColor,
                        legendIndex: 2,
                        name: 'All Neighbors',
                        data: $scope.chartData.series[1].data,
                        fillColor: 'rgba(0,0,0,0)'
                    },
                    {
                        color: defaultOptions.neighborSettings['EFFICIENT_NEIGHBORS'].lineColor,
                        legendIndex: 1,
                        name: 'Efficient Neighbors',
                        data: $scope.chartData.series[2].data,
                        fillColor: 'rgba(0,0,0,0)'
                    },
                    {
                        color: defaultOptions.neighborSettings['YOU'].lineColor,
                        legendIndex: 0,
                        name: "You",
                        data: $scope.chartData.series[0].data,
                        lineWidth: 4,
                        fillColor: 'rgba(0,0,0,0)'
                    }
                ]
            });
        }
    };
});
