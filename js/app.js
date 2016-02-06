angular
  .module('gitly', ['ngMaterial','ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {templateUrl:"views/found.html"})
        .otherwise({ templateUrl: "views/not-found.html" });
  }])
  .controller('AppCtrl',['$scope','$http', function ($scope,$http) {

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

      $scope.githubRepos = [{
          repoName: "",
          repoUrl: "",
          repoDescription: "",
          repoWebsite: "",
          repoLanguage: "",
          repoForks: "",
          repoWatchers:""
      }];

      $scope.githubFollowing = [{
          followingLogin: "",
          followingImage: "",
          followingUrl: ""
      }];

      $scope.githubFollowers = [{
          followingLogin: "",
          followingImage: "",
          followingUrl: ""
      }];
           
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

      if ($scope.pageLoad == true) {
          $scope.getUserDetails();
          $scope.pageLoad = false;
      }
      

      $scope.getUserRepos = function () {

      };

      $scope.getUserFollowers = function () {

      };

      $scope.getUserFollowing = function () {

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