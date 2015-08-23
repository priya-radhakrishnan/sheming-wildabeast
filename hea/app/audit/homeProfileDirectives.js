'use strict';

var ngApp = angular.module('app');

ngApp.directive('questionRadio', function () {
    return {
        restrict: 'AE',
        scope: {
          question: '=',
          onAnswered: '&'
        },
        templateUrl: 'app/audit/questions/question-radio.html',
        link: function ($scope,elements,attr) {

            $scope.subtitleText = $scope.question.subtitle;
            if ( $scope.question.preFilled ) {
                $scope.subtitleText = "Answer suggested based on what we know about your home.";
            }

            var answered_question = function (val) {
                $scope.question.status = "answered";
                var skipLogic = null, restoreLogic = null;
                if ( $scope.question.skip ) {
                    skipLogic = $scope.question.skip[val];
                    // if this is missing, we want to restore questions
                    if ( ! skipLogic ) {
                        restoreLogic = $scope.question.skip.restore;
                    }
                }
                $scope.onAnswered({question:$scope.question, s:skipLogic, r:restoreLogic});
            };

            $scope.$watch('question.answer', function (newValue,oldValue) {

                // skip all this if this is prefilled
                if ( $scope.question.preFilled ) {
                    return;
                }

                if ( newValue !== oldValue && newValue !== null) {
                    answered_question(newValue);
                }
            });
            $scope.clickedUnsure = function () {
                $scope.question.answer = null;
                $scope.question.status = "unsure";
                $scope.onAnswered({question:$scope.question, s:null, r:null});
            };
            $scope.clickedConfirm = function () {
                $scope.question.preFilled = false;
                answered_question($scope.question.answer);
            };
        }
    };
});

ngApp.directive('questionCheckbox', function () {
    return {
        restrict: 'AE',
        scope: {
          question: '=',
          onAnswered: '&'
        },
        templateUrl: 'app/audit/questions/question-checkbox.html',
        link: function ($scope,elements,attr) {
            $scope.submitAnswer = function () {
                $scope.question.status = "answered";
                var skipLogic = null, restoreLogic = null;
                if ( $scope.question.skip ) {
                    for ( var ii = 0; ii < $scope.question.answers.length; ii++ ) {
                        if ( $scope.question.skip[ii] ) {
                            // check if we answered true
                            if ( $scope.question.answers[ii] === $scope.question.skip[ii].value ) {
                                // init for the first time
                                if ( skipLogic === null ) {
                                    skipLogic = {
                                        questions: []
                                    };
                                }
                                // merge skip logic
                                skipLogic.questions = skipLogic.questions.concat($scope.question.skip[ii].questions);
                            } else {
                                // init for the first time
                                if ( restoreLogic === null ) {
                                    restoreLogic = {
                                        questions: []
                                    };
                                }
                                restoreLogic.questions = restoreLogic.questions.concat($scope.question.skip[ii].questions);
                            }
                        }
                    }
                }
                $scope.onAnswered({question:$scope.question, s:skipLogic, r:restoreLogic});
            };
            $scope.clickedUnsure = function () {
                $scope.question.answer = null;
                $scope.question.status = "unsure";
                $scope.onAnswered({question:$scope.question, s:null, r:null});
            };
        }
    };
});


ngApp.directive('questionBinary', function () {
    return {
        restrict: 'AE',
        scope: {
          question: '=',
          onAnswered: '&'
        },
        templateUrl: 'app/audit/questions/question-binary.html',
        link: function ($scope,elements,attr) {
            $scope.$watch('question.answer', function (newValue,oldValue) {
                if ( newValue !== oldValue && newValue !== null ) {
                    $scope.question.status = "answered";
                    var skipLogic = null, restoreLogic = null;
                    if ( $scope.question.skip ) {
                        skipLogic = $scope.question.skip[newValue];
                        // if this is missing, we want to restore questions
                        if ( ! skipLogic ) {
                            restoreLogic = $scope.question.skip.restore;
                        }
                    }
                    $scope.onAnswered({question:$scope.question, s:skipLogic, r:restoreLogic});
                }
            });
            $scope.selectionColor = function (answer,selection) {
                var className;
                if ( answer === null ) {
                    className = "";
                } else if ( answer === selection ) {
                    className = "selected";
                } else {
                    className = "not-selected";
                }
                return className;

            };
            $scope.clickedUnsure = function() {
                $scope.question.answer = null;
                $scope.question.status = "unsure";
                $scope.onAnswered({question:$scope.question, s:null, r:null});
            };
        }
    };
});

ngApp.directive('questionDropdown', function () {
    return {
        restrict: 'AE',
        scope: {
          question: '=',
          onAnswered: '&'
        },
        templateUrl: 'app/audit/questions/question-dropdown.html',
        link: function ($scope,elements,attr) {
            $scope.$watch('question.answer', function (newValue,oldValue) {
                if ( newValue !== oldValue && newValue !== null) {
                    $scope.question.status = "answered";
                    var skipLogic = null, restoreLogic = null;
                    if ( $scope.question.skip ) {
                        skipLogic = $scope.question.skip[newValue];
                        // if this is missing, we want to restore questions
                        if ( ! skipLogic ) {
                            restoreLogic = $scope.question.skip.restore;
                        }
                    }
                    $scope.onAnswered({question:$scope.question, s:skipLogic, r:restoreLogic});
                }
            });
            $scope.clickedUnsure = function() {
                $scope.question.answer = null;
                $scope.question.status = "unsure";
                $scope.onAnswered({question:$scope.question, s:null, r:null});
            };
        }
    };
});

ngApp.directive('questionTextbox', function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
          question: '=',
          onAnswered: '&'
        },
        templateUrl: 'app/audit/questions/question-textbox.html',
        link: function ($scope,elements,attr) {

            // if we are showing helpers
            $scope.showHelper = false;
            $scope.$watch('question.answer',function(newValue,oldValue){
                $scope.showHelper = !!newValue;
            });

            // figuring out prefilled messaging
            $scope.subtitleText = $scope.question.subtitle;
            $scope.submitText = "CONTINUE";
            if ( $scope.question.preFilled ) {

                if ( $scope.question.preFilled === true ) {
                    $scope.subtitleText = "Answer suggested based on what we know about your home.";
                    $scope.submitText = "CONFIRM";
                }

                // watch this
                $scope.$watch('question.preFilled',function(newValue,oldValue){
                    if ( newValue !== oldValue) {
                        if ( newValue === true ) {
                            $timeout(function(){
                                $scope.subtitleText = "Answer suggested based on what we know about your home.";
                                $scope.submitText = "CONFIRM";
                            },2000);
                        } else {
                            $timeout(function(){
                                $scope.subtitleText = $scope.question.subtitle;
                                $scope.submitText = "CONTINUE";
                            },2000);
                        }
                    }
                });
            }

            $scope.submitAnswer = function () {
                if ( $scope.question.preFilled ) {
                    $scope.question.preFilled = false;
                }
                $scope.question.status = "answered";
                $scope.onAnswered({question:$scope.question, s:null, r:null});
            };

            $scope.clickedUnsure = function () {
                if ( $scope.question.preFilled ) {
                    $scope.question.preFilled = false;
                }  else {
                    $scope.question.answer = null;
                }
                $scope.question.status = "unsure";
                $scope.onAnswered({question:$scope.question, s:null, r:null});
            };
        }
    };
});

ngApp.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$parsers.unshift(function (inputValue) {
                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                ngModel.$viewValue = digits;
                ngModel.$render();
                return digits;
            });
        }
    };
});

ngApp.directive('surveyResponsiveBottom', function($window,$timeout) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {

            var lastScrollOffset = 300;

            scope.responsiveBottom = {
                "padding-bottom": "0px"
            };

            // code that deals with question scrolling and stuff
            var calculateBottom = function () {

                var questions = element[0].getElementsByClassName("question-row");

                // only do this for more than 1 question
                if ( questions.length > 1 ) {
                    var lastQuestion = questions[questions.length - 1];

                    if ( lastQuestion ) {
                        var newValue = $window.innerHeight - lastQuestion.offsetHeight - lastScrollOffset;
                        // make sure it doesn't become something unreasonable
                        if ( newValue < 50 ) newValue = 50;
                        scope.responsiveBottom["padding-bottom"] = newValue + "px";
                    }
                }
            };

            scope.$on("refreshSurveyBottom",function(event,args){
                lastScrollOffset = args.scrollOffset;
                calculateBottom();
            });

            angular.element($window).on('resize',calculateBottom);

            // want this to run after we render
            // http://blog.brunoscopelliti.com/run-a-directive-after-the-dom-has-finished-rendering/
            $timeout(calculateBottom,0);
        }
    };

});
