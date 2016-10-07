(function() {
    'use strict';

    angular.module("GitHubSearch")
            .factory("gitHubDataService", gitHubDataService);

    function gitHubDataService($http) {

        var getUser = function(gituser) {
            return $http.get('https://api.github.com/users/' + gituser)
                .then(function(response) {
                    return response.data;
                });
        };

        var getRepos = function(user) {
            return $http.get(user.repos_url)
                .then(function(response) {
                    return response.data;
                });
        };

        var getCbtrs = function(gituser, gitrepo) {
            var repo;
            var repoUrl = "http://api.github.com/repos/" + gituser + "/" + gitrepo;
            return $http.get(repoUrl)
                .then(function(response) {
                    repo = response.data;
                    return $http.get(repoUrl + "/contributors")
                        })
                .then(function(response){
                    repo.contributors = response.data;
                    return repo;
                })

        };

        return{
        getUser: getUser,
        getRepos: getRepos,
        getCbtrs: getCbtrs
      }
    }

}());