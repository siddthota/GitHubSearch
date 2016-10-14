(function(){
    'use strict';

    angular.module('GitHubSearch')
        .controller("UserCtrl", ["$scope", "gitHubDataService", "$routeParams", UserCtrl]);

    function UserCtrl($scope, gitHubDataService, $routeParams) {

        $scope.activeTab = 'on-Repos';
        $scope.gituser = $routeParams.gituser;
        $scope.sortOrder = '-stargazers_count';

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

           /* gitHubDataService.getRepos($scope.user)
                .then(onRepos, onError);*/

        };

        var onError = function (reason) {
            $scope.error = "Couldn't fetch data of the user"
        };

        $scope.$watch('gituser', function(newval, oldval) {
            gitHubDataService.getUser($scope.gituser).then(onUserComplete, onError);
            console.log(newval, oldval);
        });

        $scope.activate = function(tab) {
            $scope.activeTab = tab || $scope.activeTab;
            //gitHubDataService.getUser($scope.gituser).then(onUserComplete, onError);
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