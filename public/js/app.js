
  (function () {
  var app = angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'colors.controller',
    'colores.services'
  ]);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/cartillas.html',
        controller: 'cartillasController'
      })
      .when('/:cartilla', {
        templateUrl: 'views/colores.html',
        controller: 'cartillasController'
      })
      .when('/colores/', {
        templateUrl: 'views/colores.html',
        controller: 'coloresController'

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
