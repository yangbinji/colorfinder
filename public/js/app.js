
  (function () {
  var app = angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'colors.controller'
  ]);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/cartillas', {
        templateUrl: 'views/cartillas.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'DemoCtrl'

      })
      .otherwise({
        redirectTo: '/'
      });
  }]);


})();
