(function() {
    'use strict';

    angular.module("GitHubSearch")
            .factory("gitHubDataService", gitHubDataService);

    function gitHubDataService($http) {

        var getUser = function(gituser) {
            var userData;
            var userUrl = "https://api.github.com/users/" + gituser;
            return $http.get(userUrl)
                .then(function(response) {
                    userData = response.data;
                    return $http.get(userUrl + "/followers");
                })
                .then(function(response) {
                    userData.followers = response.data;
                    return userData;
                })
        };

        var getRepos = function(userData) {
            return $http.get(userData.repos_url)
                .then(function(response) {
                    return response.data;
                });
        };

        var getSubs = function(userData) {
            return $http.get(userData.subscriptions_url)
                .then(function(response) {
                    return response.data
                })
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
        getSubs: getSubs
      }
    }

}());