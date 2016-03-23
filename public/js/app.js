
  (function () {
  var app = angular.module('myApp', [
    'ngStorage',
    'ngRoute',
    'ngclipboard',
    'ngMaterial',
    'ngMessages',
    'material.svgAssetsCache',
    'colors.controller',
    'color.directives',
    'colores.services',
    'sf.virtualScroll'

  ]);

  app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/cartillas.html',
        controller: 'cartillasController'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'DemoCtrl'

      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'DemoCtrl'

      })
      .when('/me', {
          templateUrl: 'partials/me.html',
          controller: 'HomeCtrl'
      })
      .when('/colores/:codigo', {
        templateUrl: 'partials/color-ficha.html',
        controller: 'codigoController'
      })
      .when('/:cartilla', {
        templateUrl: 'views/colores.html',
        controller: 'cartillasController'
      })

      .when('/partials/ficha/', {
        templateUrl: 'partials/color-ficha.html',
        controller: 'codigoController'
      })
      .when('/servicios/ayuda', {
        templateUrl: 'views/ayuda.html',
        controller: ''

    })

      .otherwise({
        redirectTo: '/signin'
      });

      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);


  }

]);




})();
