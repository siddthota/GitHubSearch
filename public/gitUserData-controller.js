(function(){
    'use strict';

    angular.module('GitHubSearch')
        .controller("UserCtrl", ["$scope", "gitHubDataService", "$routeParams", UserCtrl]);

    function UserCtrl($scope, gitHubDataService, $routeParams) {

        var onRepos = function (userData) {
            $scope.repos = userData;
        };

        var onUserComplete = function (data) {
            $scope.user = data;
            $scope.followers = data.followers;
            gitHubDataService.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onError = function (reason) {
            $scope.error = "Couldn't fetch data of the user"
        };

        $scope.gituser = $routeParams.gituser;
        $scope.sortOrder = '-stargazers_count';
        gitHubDataService.getUser($scope.gituser).then(onUserComplete, onError);

    }

}());