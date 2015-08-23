'use strict';

var ngApp = angular.module('app');


ngApp.controller('homeProfileController', function($scope, $location, $document, $timeout, surveyService, $stateParams, $rootScope, $window) {

    $scope.questions = surveyService.startSurvey();
    $scope.completedSurvey = surveyService.getCompleted();
    $scope.showAlert = false;

    var currentQuestion = null;
    var noHeader = false;

    // if you change this be sure to change the scroll offset as well
    var SCROLL_TIME = 500;
    var QUESTION_HEIGHT_THRESHOLD = 500;

    var calculateScrollOffset = function (question) {

        // 100 is height of the bottom bar
        var value = ( $window.innerHeight - 100 - question.offsetHeight ) / 2;

        if ( value < 50 ) {
            value = 50;
        } else if ( value > 300 ) {
            value = 300;
        }
        return value;
    };

    var setTitleVisibility = function () {
        $scope.showHeader = false;

        if( ! currentQuestion || noHeader ) {
            $scope.showHeader = false;
        } else if ( currentQuestion.offsetHeight > QUESTION_HEIGHT_THRESHOLD ) {
            if ( $document.scrollTop() > currentQuestion.offsetTop &&
                $document.scrollTop() < ( currentQuestion.offsetTop + currentQuestion.offsetHeight) ) {
                $scope.showHeader = true;
            } else {
                $scope.showHeader = false;
            }
        } else {
            $scope.showHeader = false;
        }
    };

    $rootScope.$on('duScrollspy:becameActive', function($event, $element){

        currentQuestion = $element[0];

        var q = surveyService.getQuestionById(currentQuestion.id);
        $scope.currentTitle = q.title;

        setTitleVisibility();
    });

    $document.on('scroll', function() {
        setTitleVisibility();
    });

    var scrollToElement = function ( domElement ) {

        var offset = calculateScrollOffset(domElement);
        $document.scrollToElement(domElement,offset,SCROLL_TIME);

        return offset;
    }

    var scrollToElementOffset = function ( domElement, offset ) {

        $document.scrollToElement(domElement,offset,SCROLL_TIME);
    }


    // advancing
    var advanceQuestion = function (questionId) {

        noHeader = true;

        // we advanced to a question, calculate bottom margin again
        var scrollElement = angular.element(document.getElementById(questionId));
        var offset = scrollToElement(scrollElement[0]);

        $scope.$broadcast("refreshSurveyBottom", { scrollOffset : offset } );
    };

    $scope.gotoPrevious = function () {

        var domElement = document.getElementById(currentQuestion.id).previousElementSibling;

        if ( domElement ) {
            var scrollElement = angular.element(domElement);
            scrollToElement(scrollElement[0]);
        }
    };

    $scope.gotoNext = function () {

        var domElement = document.getElementById(currentQuestion.id).nextElementSibling;

        if ( domElement ) {
            var scrollElement = angular.element(domElement);
            scrollToElement(scrollElement[0]);
        }
    };


    $scope.answered = function (question, s, r) {

        // handle skip logic
        if ( s ) {
            surveyService.skipQuestions(s.questions);
        }
        // handle restore logic
        if ( r ) {
            surveyService.restoreQuestions(r.questions);
        }

        var nextQuestionId = surveyService.findNextQuestion(question.id);
        if ( nextQuestionId ) {
            surveyService.showQuestion(nextQuestionId);
            $timeout( function(){
                advanceQuestion(nextQuestionId);
            },150);

        } else if ( !$scope.completedSurvey ){

            // flag this for completed
            surveyService.completedAudit();

            $timeout ( function() {
                question.submitStatus = "";
                $location.path('/' +  $stateParams.utility + '/energy-trends/home-energy-analysis');
            },1750);

        }

    };

    $scope.returnToPie = function () {

        var unansweredQuestion = surveyService.firstUnansweredQuestion();

        // we didn't get an unanswered questions, done with survey, lets to go pie chart
        if ( unansweredQuestion === null ) {
            $location.path('/' +  $stateParams.utility + '/energy-trends/home-energy-analysis');
        } else {

            var shakeQuestion = function ( questionToShake ) {
                questionToShake.addClass("shake");
                $scope.showAlert = true;
                $timeout(function(){
                    questionToShake.removeClass("shake");
                },500);

                $timeout(function(){
                    $scope.showAlert = false;
                },2000)
            }

            var scrollElement = angular.element(document.getElementById(unansweredQuestion.id));

            // if it is already in view
            if (scrollElement.hasClass('active') ) {
                shakeQuestion(scrollElement);
            } else {

                // scroll user to that question
                scrollToElementOffset(scrollElement[0],130);
                $timeout( function() {
                    shakeQuestion(scrollElement)
                },750);
            }
        }
    };

    $scope.surveyProgress = function() {
        var total = $scope.questions.length;
        var answered = surveyService.getAnsweredCount();
        var value = Math.floor(answered / total * 100 );
        return value;
    };

    // check if we need to advance to somwhere
    var q = surveyService.startSurvey()[0];

    // ugh, messy logic
    // basically we only want to advance if the first question is trimmed and users have answered more than 1
    // or if question is not trimmed and if you already ansswerd a question
    if ( ( q.trim === true && surveyService.getAnsweredCount() > 1 ) ||
         ( q.trim === false && surveyService.getAnsweredCount() > 0 ) ) {
        var index = surveyService.lastAnsweredQuestion();
        if ( index >= 0 ) {
           var nextQuestionId = surveyService.findNextQuestion($scope.questions[index].id);
            if ( nextQuestionId ) {
                surveyService.showQuestion(nextQuestionId);
                $timeout( function(){
                    advanceQuestion(nextQuestionId);
                },1000);
            }
        }
    };
});

ngApp.controller('homeProfileHookController', function($scope, $location, $timeout, surveyService, $stateParams) {

    $scope.q = surveyService.startSurvey()[0];

    $scope.answered = function (question) {

        // cut this off
        question.trim = true;

        var redirect = function () {
            $location.path($stateParams.utility + '/questions');
        };

        $timeout( function() {
            redirect();
        },350);
    };

});


ngApp.controller('homeProfileContinueController', function($scope, $location, $timeout, surveyService) {

    // restore the first question from trim state
    var q = surveyService.startSurvey()[0];
    q.trim = false;

    $scope.continueSurvey = function () {

    };

});

