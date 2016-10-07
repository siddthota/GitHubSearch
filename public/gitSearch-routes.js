(function(){
    'use strict';
    var app = angular.module('GitHubSearch', ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/index", {
                templateUrl: "gituserSearch.html",
                controller: "SearchCtrl"
            })
            .when("/user/:gituser", {
                templateUrl: "gitUserData.html",
                controller: "UserCtrl"
            })
            .when("/repo/:gituser/:gitrepo", {
                templateUrl: "gitContributorData.html",
                controller: "ContributorCtrl"
            })
            .otherwise({redirectTo: "/index"});
    });

}());