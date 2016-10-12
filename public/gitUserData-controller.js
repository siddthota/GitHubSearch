(function(){
    'use strict';

    angular.module('GitHubSearch')
        .controller("UserCtrl", ["$scope", "gitHubDataService", "$routeParams", UserCtrl]);

    function UserCtrl($scope, gitHubDataService, $routeParams) {

        $scope.activeTab = 'on-Repos';

        var onRepos = function (userData) {
            $scope.repos = userData;
        };

        var onSubs = function(userData) {
            $scope.subs = userData;
        };

        var onUserComplete = function(data) {
            $scope.user = data;
            $scope.followers = data.followers;
           /* gitHubDataService.getRepos($scope.user)
                .then(onRepos, onError);*/
            function tabInfo() {
                if($scope.activeTab === 'on-Repos') {
                    gitHubDataService.getRepos($scope.user)
                        .then(onRepos, onError);
                }
                else if($scope.activeTab === 'on-Subs') {
                    gitHubDataService.getSubs($scope.user)
                        .then(onSubs, onError);
                }
            }
            tabInfo();
        };

        var onError = function (reason) {
            $scope.error = "Couldn't fetch data of the user"
        };

        $scope.gituser = $routeParams.gituser;
        $scope.sortOrder = '-stargazers_count';
        gitHubDataService.getUser($scope.gituser).then(onUserComplete, onError);


    }

}());