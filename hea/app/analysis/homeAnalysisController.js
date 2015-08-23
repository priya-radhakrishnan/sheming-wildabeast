'use strict';

var ngApp = angular.module('app');

ngApp.controller('homeEnergyAnalysisProgressController',function ($scope, surveyService, $modal) {

    // get the status of the survey
    $scope.surveyStatus = surveyService.surveyStatus();

    if ( $scope.surveyStatus === 'incomplete' ) {
        $scope.surveyHookTemplate = 'app/audit/pages/questions-hook.html';
    } else if ( $scope.surveyStatus === "started" ) {
        $scope.surveyHookTemplate = "app/audit/pages/questions-incomplete.html";
    }

    $scope.surveyProgress = function() {
        var total = surveyService.getQuestionsCount();
        var answered = surveyService.getAnsweredCount();
        var value = Math.floor(answered / total * 100 );

        // bad programming practices
        if ( value < 60 ) {
            $scope.incompleteTitle = "Let's continue your home energy analysis";
            $scope.minutesLeft = "two minutes";
        } else {
            $scope.incompleteTitle = "You're almost done!";
            $scope.minutesLeft = "one minute";
        }

        return value;
    };
});



'use strict';

var app = require('../app'),
    chartData = require('../fixtures/fake-disagg'),
    dataFormatService = require('../services/data-format-service');

ngApp.controller('disaggregationChartController', function($scope, $window) {

    // $scope.currentSliceIndex = null;
    $scope.tipsShown = false;
    $scope.chartSize = null;

    var calculateChartSize = function () {

        var newChartSize = 0;

        if ( $window.outerHeight < 900 || $window.innerWidth < 640  ) {
            newChartSize = 325;
        } else {
            newChartSize = 400;
        }

        if ( $scope.chartSize === null  ) {
            $scope.chartSize = newChartSize;
        } else if ( newChartSize !== $scope.chartSize ) {
            $scope.chartSize = newChartSize;
            $scope.$apply();
        }
    };

    angular.element($window).on('resize',calculateChartSize);
    calculateChartSize();

    $scope.hintsClass = function () {
        var className = "";
        if ( $scope.tipsShown ) {
            className = "shown";
        }
        return className;
    };

    // hooked onto onSlice
    $scope.showingIndex = function ( index ) {
        // $scope.currentSliceIndex = index;
        $scope.tipsShown = true;
        $scope.$apply();
    };

    $scope.leavePie = function () {
        // $scope.currentSliceIndex = null;
        $scope.$apply();
    };

    $scope.legendColor = function ( index ) {
        var color = {'background-color':$scope.chartColor[index]};
        return color;
    };

    $scope.chartColor = ['#445175',
                         '#C64063',
                         '#C4A02D',
                         '#DDDD0A',
                         '#AD5DAF',
                         '#4E8691'];

    $scope.grayColor = ['#919191',
                        '#A1A1A1',
                        '#B1B1B1',
                        '#C1C1C1',
                        '#D1D1D1',
                        '#E1E1E1'];

    $scope.chartData = dataFormatService.formatForPieChart(chartData);

    // our colors
    $scope.disaggregationChart = {
        chartColor: $scope.chartColor,
        grayColor: $scope.grayColor,
        insights: [
            {
              "tip": "You spend the most on cooling",
              "link": "Lower cooling costs"
            },
            {
              "tip": "You spend the a lot on heating",
              "link": "Lower heating costs"
            },
            {
              "tip": "Your electric water heater is twice as expensive as natural gas header.",
              "link": "Lower hot water costs"
            },
            {
              "tip": "Your lighting cost is average",
              "link": "Lower lighting costs"
            },
            {
              "tip": "Your appliances cost is average",
              "link": "Lower appliances costs"
            },
            {
              "tip": "Your other cost is average",
              "link": "Lower electronics costs"
            }
        ],
        chartData: dataFormatService.formatForPieChart(chartData),
        chartSize: $scope.chartSize
    };
});


ngApp.controller('homeEnergyAnalysisController',function ($scope,$timeout) {

    $scope.showLoadingAnimation = true;

    // child will emit this
    $scope.$on('animationDone',function () {
        $scope.showLoadingAnimation = false;
        $scope.$apply();
    });

});

ngApp.controller('loadingAnimationController', function ($scope, $timeout) {

    $scope.sequenceOne = 'waiting';
    $scope.sequenceTwo = 'waiting';
    $scope.sequenceThree = 'waiting';

    var doneAnimation = function () {
        // tell parent we're done
        $scope.$emit("animationDone");
    };

    $scope.sequenceClass = function (seq) {
        if ( seq === "waiting" ) {
            return "list-waiting";
        } else if ( seq === "loading") {
            return "list-loading";
        } else {
            return "list-done";
        }

    };

    var circle = new ProgressBar.Circle('#progress-circle-container', {
        color: '#107cb2',
        strokeWidth: 1,
        trailColor: "#e1e1e1",
//        ease: 'easeInOut',
        duration: 6500
    });

    function sequenceOne() {
        $scope.sequenceOne = "loading";
        $timeout(function(){
            $scope.sequenceOne = "done";
        },3000);
        // circle.animate(0.33);
    }

    function sequenceTwo() {
        $scope.sequenceTwo = "loading";
        $timeout(function(){
            $scope.sequenceTwo = "done";
        },3000);
        // circle.animate(0.66);
    }



    sequenceOne();
    $timeout(sequenceTwo,3500);
    $timeout(doneAnimation,7500);

    circle.animate(1);


});
