(function(){
    'use strict';

    angular.module('GitHubSearch')
        .controller("ContributorCtrl", ["$scope", "gitHubDataService", "$routeParams", ContributorCtrl]);

    function ContributorCtrl($scope, gitHubDataService, $routeParams) {

        var gitrepo = $routeParams.gitrepo;
        var gituser = $routeParams.gituser;

        var onCtri = function(data) {
            $scope.repo = data
        } ;

        var onError = function(reason) {
            $scope.error = reason;
        };

        gitHubDataService.getCbtrs(gituser, gitrepo).then(onCtri, onError);
    }

}());