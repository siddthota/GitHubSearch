(function(){
    'use strict';

    angular.module('GitHubSearch')
        .controller("SearchCtrl", ["$scope", "$interval", "$location", SearchCtrl]);

    function SearchCtrl($scope, $interval, $location) {

        var countDownRed = function() {
            $scope.countDown -= 1;
                if($scope.countDown < 1) {
                    $scope.onSearch($scope.gituser);
                }
                };

            var intervalCount = null;
            var countDownTimer = function() {
                intervalCount = $interval(countDownRed, 1000, $scope.countDown)
            };

            $scope.onSearch = function(gituser) {
                if(intervalCount) {
                    $interval.cancel(intervalCount);
                    $scope.countDown = null;
                }
                $location.path("/user/" + gituser);
            };

            $scope.stopTimer = function() {
                $interval.cancel(intervalCount);
                $scope.countDown = null;
            };

            $scope.gituser = 'angular';
            $scope.countDown = 5;
            countDownTimer();

        }

}());