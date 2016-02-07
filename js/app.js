angular
  .module('gitly', ['ngMaterial','ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {templateUrl:"views/found.html"})
        .otherwise({ templateUrl: "views/not-found.html" });
  }])
  .controller('AppCtrl',['$scope','$http','$window', function ($scope,$http,$window) {

      /* flags */
      $scope.pageLoad = true;
      /* ***** */

      $scope.followersSearch = "";
      $scope.followingSearch = "";
      $scope.reposSearch = "";

      $scope.githubUser = {
          userName: "",
          userBio: "",
          userLogin:"",
          userImage: "",
          userUrl: "",
          userFollowers: "",
          userFollowing: "",
          userEmail: "",
          userSiteAdmin: "",
          userRepos: "",
          userBlog: "",
          userLocation: "",
          userHireable: ""
      };

      $scope.githubRepos = {};
      //$scope.githubRepos = [{
      //    repoName: "",
      //    repoUrl: "",
      //    repoDescription: "",
      //    repoWebsite: "",
      //    repoLanguage: "",
      //    repoForks: "",
      //    repoWatchers:""
      //}];
      $scope.githubFollowing = {};
      //$scope.githubFollowing = [{
      //    //followingLogin: "",
      //    //followingImage: "",
      //    //followingUrl: ""
      //}];
      $scope.githubFollowers = {};
      //$scope.githubFollowers = [{
      //    followingLogin: "",
      //    followingImage: "",
      //    followingUrl: ""
      //}];
           
      /*
      data.items.push(
    {id: "7", name: "Douglas Adams", type: "comedy"}
);
      */
      
      $scope.getUserDetails=function(x){
          $http.get("https://api.github.com/users/clydedz")
               .then(function (response) {
                   $scope.githubUser.userName = response.data.name;
                   $scope.githubUser.userBio = response.data.bio;
                   $scope.githubUser.userLogin = response.data.login;
                   $scope.githubUser.userImage = response.data.avatar_url;
                   $scope.githubUser.userUrl = response.data.html_url;
                   $scope.githubUser.userFollowers = response.data.followers;
                   $scope.githubUser.userFollowing = response.data.following;
                   $scope.githubUser.userEmail = response.data.email;
                   $scope.githubUser.userWork = response.data.company;
                   $scope.githubUser.userSiteAdmin = response.data.site_admin;
                   $scope.githubUser.userRepos = response.data.public_repos;
                   $scope.githubUser.userBlog = response.data.blog;
                   $scope.githubUser.userLocation = response.data.location;
                   $scope.githubUser.userHireable = response.data.hireable;
                },
                function () {

                });
      }
           
      
      //
      $scope.getUserRepos = function () {
          $http.get("https://api.github.com/users/clydedz/repos")
               .then(function (response) {
                   $scope.githubRepos = response.data;
                   //$scope.githubRepos.repoName = response.data.name;
                   //$scope.githubRepos.repoUrl = response.data.name;
                   //$scope.githubRepos.repoDescription = response.data.name;
                   //$scope.githubRepos.repoWebsite = response.data.name;
                   //$scope.githubRepos.repoLanguage = response.data.name;
                   //$scope.githubRepos.repoForks = response.data.name;
                   //$scope.githubRepos.repoWatchers = response.data.name;
               },
                function () {

                });
      };

      $scope.getUserFollowers = function () {
          $http.get("https://api.github.com/users/clydedz/followers")
               .then(function (response) {
                   console.log(response);
                   $scope.githubFollowers = response.data;
               },
                function () {

                });
      };

      $scope.getUserFollowing = function () {
          $http.get("https://api.github.com/users/clydedz/following")
               .then(function (response) {
                   console.log(response);
                   $scope.githubFollowing = response.data;
               },
                function () {

                });
      };

      if ($scope.pageLoad == true) {
          $scope.getUserDetails();
          $scope.getUserRepos();
          $scope.getUserFollowing();
          $scope.getUserFollowers();
          $scope.pageLoad = false;
      }

      $scope.navigateTo = function (to, event) {
          $window.location = to;
      };

  }])

  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
          $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
      };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
          $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
      };
  });