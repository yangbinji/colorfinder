
  (function () {
  var app = angular.module('myApp', [
    'ionic',
    'ngStorage',
    'ngRoute',
    'ngclipboard',
    'ngMaterial',
    'ngMessages',
    'material.svgAssetsCache',
    'colors.controller',
    'color.directives',
    'colores.services',
    'sf.virtualScroll',
    'clear-input'

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

      .when('/:cartilla', {
        templateUrl: 'views/colores.html',
        controller: 'cartillasController'
      })
      .when('/views/:cartilla', {
        templateUrl: 'views/coloresmagic.html',
        controller: 'magicController'
      })


      .when('/servicios/ayuda', {
        templateUrl: 'views/ayuda.html',
        controller: ''

    })
    .when('/servicios/ayuda/faqs', {
      templateUrl: 'views/faqs.html',
      controller: 'faqsCtrl'

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
