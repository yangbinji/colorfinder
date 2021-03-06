
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
    'colores.services'

  ]);

  app.config(['$routeProvider', '$httpProvider','$locationProvider', function($routeProvider, $httpProvider, $locationProvider){
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
  .when('/servicios/ayuda/tutorial', {
    templateUrl: 'views/tutorial.html',
    controller: 'tutoCtrl'

  })
  .when('/servicios/ayuda/tutorial-movil', {
    templateUrl: 'views/tutorial-mob.html',
    controller: 'tutoCtrl'

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

//     $locationProvider.html5Mode({
//   enabled: true,
//   requireBase: false
// });


  }

]);




})();
