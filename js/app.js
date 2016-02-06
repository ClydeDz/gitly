angular
  .module('sidenavDemo1', ['ngMaterial','ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {templateUrl:"views/found.html"})
        .otherwise({ templateUrl: "views/not-found.html" });
  }])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.username = "ClydeDz";
      $scope.followersSearch = "";
      $scope.project = {
          description: 'Nuclear Missile Defense System',
          rate: 500
      };
      $scope.contacts = [
        'Marina Augustine',
        'Oddr Sarno',
        'Nick Giannopoulos',
        'Narayana Garner',
        'Anita Gros',
        'Megan Smith',
        'Tsvetko Metzger',
        'Hector Simek',
        'Some-guy withalongalastaname'
      ];
      $scope.isOpenRight = function () {
          return $mdSidenav('right').isOpen();
      };
      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      function debounce(func, wait, context) {
          var timer;
          return function debounced() {
              var context = $scope,
                  args = Array.prototype.slice.call(arguments);
              $timeout.cancel(timer);
              timer = $timeout(function () {
                  timer = undefined;
                  func.apply(context, args);
              }, wait || 10);
          };
      }
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildDelayedToggler(navID) {
          return debounce(function () {
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
          }, 200);
      }
      function buildToggler(navID) {
          return function () {
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
          }
      }
  })
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