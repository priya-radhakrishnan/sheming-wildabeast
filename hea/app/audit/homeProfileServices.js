'use strict';

var ngApp = angular.module('app');

ngApp.service('surveyService', function() {

    var questions = require('../fixtures/questions');
    var completed = false;

    this.startSurvey = function () {

        var count = 0;
        while ( count < questions.length && questions[count].trim ) {
            count++;
        }

        questions[count].show = true;

        return questions;
    };

    this.findQuestonIndex= function (questionId) {
        // find the index for the question
        var index = null;
        for ( var ii = 0; ii < questions.length && index === null; ii++ ) {
            if ( questions[ii].id === questionId ) {
                index = ii;
            }
        }
        return index;
    };

    this.findNextQuestion = function (questionId) {
        var start = this.findQuestonIndex(questionId) + 1;

        if ( start >= questions.length ) return null;

        var index = null;
        for ( var ii = start; ii < questions.length && index === null; ii++ ) {
            if ( questions[ii].status === "unanswered" ) {
                index = ii;
            }
        }

        if ( index ) {
            return questions[index].id;
        } else {
            return null;
        }
    };

    this.showQuestion = function (questionId) {
        var index = this.findQuestonIndex(questionId);
        questions[index].show = true;
    };

    this.clearAnswers = function (question) {
        if ( question.type === 'checkbox' ) {
            for (var ii = 0; ii < question.answers.length; ii++) {
                question.answers[ii] = false;
            }
        } else {
            question.answer = null;
        }
    };

    this.skipQuestion = function (questionId) {
        var index = this.findQuestonIndex(questionId);
        if ( index ) {
            this.clearAnswers(questions[index]);
            questions[index].show = false;
            questions[index].status = "skipped";
        }
    };

    this.skipQuestions = function (questionIds) {
        for ( var ii = 0; ii < questionIds.length; ii++ ) {
            this.skipQuestion(questionIds[ii]);
        }
    };

    this.restoreQuestion = function (questionId) {
        var index = this.findQuestonIndex(questionId);
        if ( index ) {
            if ( questions[index].status === "skipped" ) {
                questions[index].status = "unanswered";
            }
        }
    };

    this.restoreQuestions = function (questionIds) {
        for ( var ii = 0; ii < questionIds.length; ii++ ) {
            this.restoreQuestion(questionIds[ii]);
        }
    };

    this.surveyStatus = function () {

        var status = "incomplete";

        if ( this.getAnsweredCount() == questions.length ) {
            status = "completed";
        } else if ( this.getAnsweredCount() !== 0 ) {
            status = "started";
        }

        return status;
    };

    this.getAnsweredCount = function () {
        var count = 0;
        for ( var ii = 0; ii < questions.length; ii++ ) {
            if ( questions[ii].status === "answered" || questions[ii].status == "skipped" || questions[ii].status == "unsure" ) {
                count++;
            }
        }
        return count;
    };

    this.getQuestionsCount = function () {
        return questions.length;
    };

    this.lastAnsweredQuestion = function () {
        return this.getAnsweredCount() - 1;
    };

    this.getQuestionById = function (questionId) {
        // find the index for the question
        var question = null;
        for ( var ii = 0; ii < questions.length && question === null; ii++ ) {
            if ( questions[ii].id === questionId ) {
                question = questions[ii];
            }
        }
        return question;
    };

    this.completedAudit = function () {
        completed = true;
    };

    this.getCompleted = function () {
        return completed;
    };

    // to know if we completed the survey
    this.firstUnansweredQuestion = function () {
        var unanswered = null;
        for ( var ii = 0; ii < questions.length && unanswered === null; ii++ ) {
            if (questions[ii].status === "unanswered") {
                unanswered = questions[ii];
            }
        }

        return unanswered;

    };

});
