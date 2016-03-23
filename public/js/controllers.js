(function(){
  angular.module('colors.controller',[])
  .controller('cartillasController', ['$scope', '$routeParams','colorService', function($scope, $routeParams, colorService){
    var cartilla = $routeParams.cartilla;
    if(cartilla){
      colorService.byCartilla(cartilla).then(function(data){
        $scope.colores = data;
      });
    } else{

    }
  }])

  .controller('capturaCtrl', ['$scope', 'captura', function($scope, captura){
   $scope.capturame = '4334';
   $scope.setCodigo = captura.setCodes;

 }])

 .controller('recibeCtrl', ['$scope', 'captura', function($scope, captura){
  	$scope.codigo = captura.getCodes;

  }])

  .controller('codigoController', ['$scope','colorService','captura', function($scope, colorService, captura){
     var codigo = captura.getCodes();
    if(codigo){
      colorService.byCodigo(codigo).then(function(data){
        $scope.colores = data;
      });
    } else{

    }
  }])
  .controller('favCtrl',[ '$rootScope','$scope', '$filter', '$localStorage', '$mdDialog', '$mdMedia','colorService', 'captura','Main', function ($rootScope, $scope, $filter, $localStorage, $mdDialog, $mdMedia, colorService, captura, Main) {

    $scope.$storage =  $localStorage.$default({

         a: {},
         b:{}
        });

        $scope.showAdvanced = function(ev) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: '/partials/favoritos.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          })

        };


}])

  .controller('DemoCtrl',  function ($scope) {



  })
  .controller('MyController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('right').toggle();
  };
})

  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, perfilService) {
    $scope.muestra = perfilService;
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
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
        timer = $timeout(function() {
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
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
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
  })


    .controller('BottomSheetExample', ['$scope','$routeParams', '$log', '$timeout', 'colorService',  '$mdBottomSheet', '$mdToast', 'captura', function( $scope, $routeParams, $log, $timeout, colorService,  $mdBottomSheet, $mdToast, captura) {
  $scope.alert = '';

  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'partials/color-ficha.html',
      controller: 'codigoController',
      targetEvent: $event
    })
  }



}])

.controller('closeFicha',['$scope', '$mdBottomSheet', '$log', '$timeout',  function($scope, $mdBottomSheet, $log, $timeout){
  $scope.close = function () {
    $mdBottomSheet('fi').close()
      .then(function () {
        $log.debug("close ficha is done");
      });
  };

}])


.controller('coloresController', ['$scope', '$routeParams', 'colorService', function($scope, $routeParams, colorService){
  var codigo = $routeParams.codigo
  $scope.colores = {};
    colorService.byCodigo()
    .then(function(data){
      $scope.colores = data;
    });

}])
.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$route', '$window', '$localStorage', 'Main', function($rootScope, $scope, $location, $route, $window, $localStorage, Main) {

    $rootScope.texto = 'alexanderlopez';
      $scope.signin = function() {

          var formData = {
              email: $scope.email,
              password: $scope.password
          }



          Main.signin(formData, function(res) {
                 if (res.type == false) {
                     $scope.errorAuth = res.data;
                 } else {
                     $localStorage.token = res.data.token;


                     $location.path('/');




                 }
             }, function() {
                 $rootScope.error = 'Failed to signin';
             })
      };

      $scope.signup = function() {
            var formData = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            }

            Main.save(formData, function(res) {
                if (res.type == false) {
                    $scope.errorSignup = res.data;
                } else {
                    $location.path('/signin');
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

      $scope.me = function() {
          Main.me(function(res) {
              $scope.myDetails = res;
              $route.reload();
          }, function() {
              $rootScope.error = 'Failed to fetch details';
          })
      };


      $scope.logout = function() {
          Main.logout(function() {
              $location.path('/signin');


          }, function() {
              $rootScope.error = 'Failed to logout';
          });
      };
  }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

      Main.me(function(res) {
          $scope.myDetails = res;
      }, function() {
          $rootScope.error = 'Failed to fetch details';
      })
      $scope.limpiarDatos = function(){
        $scope.myDetails = '';
      }
}])


.controller('copiadoCtrl', function($scope, $mdToast) {

  $scope.colorCopiado = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent(' Color copiado :D')
        .position('bottom right')
        .hideDelay(300)
    );
  };
})
.controller('favoriteCtrl', function($scope, $mdToast) {

  $scope.colorFav = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent(' Favorito :D')
        .position('bottom left')
        .hideDelay(300)
    );
  };
})
.controller('formCtrl', function($scope,$timeout, formulasServices ) {

  $scope.datos = formulasServices;

/*  if($scope.datos){
    $timeout(function(){$scope.datos.mensaje = false}, 3000);

  } */

})


function DialogController($scope, $mdDialog) {


  $scope.cancel = function() {
    $mdDialog.cancel();
  };


}






})();
