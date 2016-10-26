(function(){
    'use strict';

    angular.module('GitHubSearch')
        .controller("UserCtrl", ["$scope", "gitHubDataService", "$routeParams", UserCtrl])
        .filter('PaginationFilter', PaginationFilter);

    function PaginationFilter() {
        return function(input, start) {
            if(!input || !input.length) {
                return ;
            }
            start = +start;
            return input.slice(start);
        }
    }

    function UserCtrl($scope, gitHubDataService, $routeParams) {

        $scope.activeTab = 'on-Repos';
        $scope.gituser = $routeParams.gituser;
        $scope.sortOrder = '-stargazers_count';
        $scope.currentPage = 1;
        $scope.pagesize = 10;

        var onRepos = function (response) {
            $scope.repos = response.data;
        };

        var onSubs = function(response) {
            $scope.repos = response.data;
        };

        $scope.getFollowerData = function() {
            gitHubDataService.getFollowers($scope.user).then(function (response) {
                $scope.followers = response.data;
            gitHubDataService.getRepos($scope.user)
                    .then(onRepos, onError);
            }, onError);

        };

        var onUserComplete = function(response) {
            $scope.user = response.data;

            $scope.getFollowerData();

        };

        var onError = function (reason) {
            $scope.error = "Couldn't fetch data of the user"
        };

        $scope.$watch('gituser', function(newval, oldval) {
            gitHubDataService.getUser($scope.gituser).then(onUserComplete, onError);
        });

        $scope.activate = function(tab) {
            $scope.activeTab = tab || $scope.activeTab;
            if($scope.user) {
                if ($scope.activeTab === 'on-Repos') {
                    gitHubDataService.getRepos($scope.user)
                        .then(onRepos, onError);
                }
                else if ($scope.activeTab === 'on-Subs') {
                    gitHubDataService.getSubs($scope.user)
                        .then(onSubs, onError);
                }
            }
        };

        $scope.activate();

    }

}());