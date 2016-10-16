(function() {
    'use strict';

    angular.module("GitHubSearch")
            .factory("gitHubDataService", gitHubDataService);
        gitHubDataService.$inject =['$http'];
    function gitHubDataService($http) {

        var getUser = function(gituser) {
            var userUrl = "https://api.github.com/users/" + gituser;
            return $http.get(userUrl);
        };

        var getFollowers = function(userData) {
            return $http.get(userData.followers_url);
        };

        var getRepos = function(userData) {
            return $http.get(userData.repos_url);
        };

        var getSubs = function(userData) {
            return $http.get(userData.subscriptions_url);
        };

        var getCbtrs = function(gituser, gitrepo) {
            var repo;
            var repoUrl = "http://api.github.com/repos/" + gituser + "/" + gitrepo;
            return $http.get(repoUrl)
                .then(function(response) {
                    repo = response.data;
                    var repoContri = repoUrl + "/contributors";
                    return $http.get(repoContri)
                        })
                .then(function(response){
                    repo.contributors = response.data;
                    return repo;
                })
        };
        return{
        getUser: getUser,
        getRepos: getRepos,
        getCbtrs: getCbtrs,
        getSubs: getSubs,
        getFollowers: getFollowers
      }
    }
}());