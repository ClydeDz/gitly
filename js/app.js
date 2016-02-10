angular
.module('gitly', ['ngMaterial', 'ngRoute', 'ngAnimate'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', { templateUrl: "views/found.html"})
    .otherwise({ templateUrl: "views/not-found.html", controller: "NotFoundController" });
}])
.controller('AppCtrl', ['$scope', '$http', '$window', '$mdDialog', 'Page', function ($scope, $http, $window, $mdDialog, Page) {

    // flags
    $scope.isOpen = false;
    $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.pageLoad = true;
    $scope.secondaryToolbar = false;
    $scope.userTabFlag = true;
    // X_X

    // properties
    $scope.toolbarSearch = "";
    $scope.followersSearch = "";
    $scope.followingSearch = "";
    $scope.reposSearch = "";
    $scope.githubUser = {
        userName: "",
        userBio: "",
        userLogin: "",
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
    $scope.githubFollowing = {};
    $scope.githubFollowers = {};
    // X_X

    // methods
    Page.setTitle(true);


    $scope.toggleSecondaryToolbar = function () {
        $scope.secondaryToolbar = ($scope.secondaryToolbar == true ? false : true);
    };


    $scope.clearGithubUserName = function () {
        $scope.toolbarSearch = "";
        console.log($scope.toolbarSearch);
        console.log("inside x ");
    };


    $scope.showAlert = function () {
        $mdDialog.show(
        $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title("Oops, We've reached a dead end")
            .textContent("The user you were trying to fetch probably doesn't exists.")
            .ariaLabel('Alert Dialog Demo')
            .ok("Got it!")
            .targetEvent()
        );
    };


    $scope.searchGithubUser = function (x) {
        console.log("searchGithubUser " + x);
        $scope.checkGithubUser(x);
    };


    $scope.navigateTo = function (to, event) {
        $window.open(to, "_blank");
    };


    $scope.share = function (x) {
        if (x == "tweet") {
            $window.open("https://twitter.com/share?text=Try%20Gitly-%20a%20Github%20user%20lookup%20app%20by%20@ClydeDz%20at%20&url=http://gitly.azurewebsites.net/", "_blank");
        }
        else if (x == "fb") {
            $window.open("http://www.facebook.com/sharer.php?u=http://gitly.azurewebsites.net/", "_blank");
        }
        else {
            $window.open("https://plus.google.com/share?url=http://gitly.azurewebsites.net/", "_blank");
        }
    };
    // X_X
    

    // api calls
    $scope.getUserDetails = function (x) {
        x = (x == "") ? "clydedz" : x;
        console.log("getuserdetails " + x);
        $http.get("https://api.github.com/users/" + x)
            .then(function (response) {
                console.log(response);
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
            function (error) {
                $scope.userTabFlag = false;
                console.log("error HERE");
            });
    };


    $scope.getUserRepos = function (x) {
        x = (x == "") ? "clydedz" : x;
        $http.get("https://api.github.com/users/" + x + "/repos")
            .then(function (response) {
                $scope.githubRepos = response.data;
            },
            function (error) {
                $scope.userTabFlag = false;
            });
    };


    $scope.getUserFollowers = function (x) {
        x = (x == "") ? "clydedz" : x;
        $http.get("https://api.github.com/users/" + x + "/followers")
            .then(function (response) {
                console.log(response);
                $scope.githubFollowers = response.data;
            },
            function (error) {
                $scope.userTabFlag = false;
            });
    };


    $scope.getUserFollowing = function (x) {
        x = (x == "") ? "clydedz" : x;
        $http.get("https://api.github.com/users/" + x + "/following")
            .then(function (response) {
                console.log(response);
                $scope.githubFollowing = response.data;
            },
            function (error) {
                $scope.userTabFlag = false;
            });
    };


    $scope.checkGithubUser = function (x) {
        console.log("checkGithubUser "+x);
        $http.get("https://api.github.com/users/" + x)
            .then(function (response) {
                console.log(response);
                if (response.status == "200") {
                    console.log("calling func with " + response.data.login);
                    $scope.getUserDetails(response.data.login);
                    $scope.getUserRepos(response.data.login);
                    $scope.getUserFollowing(response.data.login);
                    $scope.getUserFollowers(response.data.login);
                }
                else {
                    $scope.showAlert();
                }
            },
            function (error) {
                console.log(error);
                $scope.showAlert();
            });
    };
    //X_X     

    // page load conditioning- requires functions to be defined first as a good practice
    if ($scope.pageLoad == true) {
        $scope.getUserDetails("Clydedz");
        $scope.getUserRepos("Clydedz");
        $scope.getUserFollowing("Clydedz");
        $scope.getUserFollowers("Clydedz");
        $scope.pageLoad = false;
    }
    $scope.Page = Page;

}])
.controller("FooterController", ['$scope', function ($scope) {
    $scope.topDirections = ['left', 'up'];
    $scope.bottomDirections = ['down', 'right'];
    $scope.isOpen = false;
    $scope.availableModes = ['md-fling', 'md-scale'];
    $scope.selectedMode = 'md-fling';
    $scope.availableDirections = ['up', 'down', 'left', 'right'];
    $scope.selectedDirection = 'up';
}])
.controller("ToolbarController", ['$scope', 'Page', function ($scope, Page) {
    $scope.Page = Page;
}])
.factory('Page', function(){
    var title = true;
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
    };
})
.controller("NotFoundController", ['$scope', 'Page', function ($scope, Page) {
    Page.setTitle(false);
}]);


/**********
data.items.push(
{id: "7", name: "Douglas Adams", type: "comedy"}
);
***********/
