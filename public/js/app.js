
  (function () {
  var app = angular.module('myApp', [
    'ngRoute',
    'ngclipboard',
    'ngMaterial',
    'ngMessages',
    'colors.controller',
    'color.directives',
    'colores.services'

  ]);

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/cartillas.html',
        controller: 'cartillasController'
      })
      .when('/colores/:codigo', {
        templateUrl: 'partials/color-ficha.html',
        controller: 'codigoController'
      })
      .when('/:cartilla', {
        templateUrl: 'views/colores.html',
        controller: 'cartillasController'
      })
      .when('/colores/', {
        templateUrl: 'views/colores.html',
        controller: 'coloresController'

      })
      .when('/views/coloresT/', {
        templateUrl: 'views/coloresT.html',
        controller: 'coloresController'

      })
      .when('/partials/ficha/', {
        templateUrl: 'partials/color-ficha.html',
        controller: 'codigoController'

      })

      .when('/views/login/', {
        templateUrl: 'views/login.html',
        controller: 'DemoCtrl'

      })
      .otherwise({
        redirectTo: '/'
      });
  }]);




})();
