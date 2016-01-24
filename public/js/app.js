
  (function () {
  var app = angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'colors.controller'
  ]);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/cartillas.html'
        controller: 'cartillasController'
      })
      .when('/colores', {
        templateUrl: 'views/colores.html',
        controller: 'BottomSheetExample'

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
