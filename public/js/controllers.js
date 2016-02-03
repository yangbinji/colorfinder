(function(){
  angular.module('colors.controller',[])
  .controller('cartillasController', ['$scope', '$routeParams','colorService', function($scope, $routeParams, colorService){
    var cartilla = $routeParams.cartilla;
    if(cartilla){
      colorService.byCartilla(cartilla).then(function(data){
        $scope.colores = data;
      });
    } else{
    colorService.all().then(function(data){
      $scope.colores = data;
    });
    }
  }])
  .controller('codigoController', ['$scope', '$routeParams','colorService', function($scope, $routeParams, colorService){
    var codigo = $routeParams.codigo;
    if(codigo){
      colorService.byCodigo(codigo).then(function(data){
        $scope.colores = data;
      });
    } else{
    colorService.all().then(function(data){
      $scope.colores = data;
    });
    }
  }])

  .controller('DemoCtrl',  function ($scope) {



  })

  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
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


    .controller('BottomSheetExample', ['$scope','$routeParams', 'colorService', '$timeout', '$mdBottomSheet', '$mdToast', function( $scope, $routeParams, colorService, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';

  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'partials/color-ficha.html',
      controller: 'codigoController',
      targetEvent: $event
    })
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

.controller('tabsController', function(){
  this.tab = 1;
  this.selecTab = function(tab){
    this.tab = tab;
  }
});


})();
