"use strict";angular.module("ttnApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html"}).when("/features",{templateUrl:"views/features.html"}).when("/contact",{templateUrl:"views/contact.html"}).when("/question/:questionId",{templateUrl:"views/question.html",controller:"MainCtrl"}).when("/cm",{templateUrl:"views/cm.html",controller:"CmCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("ttnApp").controller("MainCtrl",["$scope","$http","$routeParams","$q","$window",function(a,b,c,d,e){var f=function(){var a=d.defer();if(null!==e.sessionStorage.getItem("questionsData")){var c=d.defer(),f=e.sessionStorage.getItem("questionsData");return c.resolve(JSON.parse(f)),c.promise}return b.get("../../data/data.json").success(function(b){e.sessionStorage&&e.sessionStorage.setItem("questionsData",JSON.stringify(b)),a.resolve(b)}),a.promise};a.save=function(){a.questions[c.questionId-1]=a.question,e.sessionStorage?e.sessionStorage.setItem("questionsData",JSON.stringify(a.questions)):console.log("no session storage support in this browser, sorry...")},a.isLast=function(){return a.questions?a.questionId+1===a.questions.length:!1},a.total=a.total||0;var g=function(){a.total=0;for(var b=0;b<a.questions.length-1;b++)for(var c=a.questions[b],d=0;d<c.answers.length;d++){var e=c.answers[d];e.isCorrect&&e.id===parseInt(c.selectedAnswer)&&(a.total+=1)}};a.$watch("question.selectedAnswer",function(){a.questions&&g()}),a.questionId=parseInt(c.questionId),f().then(function(b){a.questions=b,a.question=a.questions[c.questionId-1]})}]),angular.module("ttnApp").controller("CmCtrl",["$scope","$http",function(a,b){function c(a){var b=a.result.columns,c=[];c.push(b);for(var d=0;d<a.result.values.length;d++){var e=a.result.values[d];c.push(e)}var f=google.visualization.arrayToDataTable(c),g={title:"data chart",vAxis:{title:"Impressions"},hAxis:{title:"Conversions"}},h=new google.visualization.LineChart(document.getElementById("chart-container"));h.draw(f,g)}b.get("data/cm.json").success(function(a){google.setOnLoadCallback(c(a))})}]);