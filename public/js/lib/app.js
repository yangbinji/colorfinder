
  (function () {
  var app = angular.module('myApp', ['ngMaterial', 'ngMessages']);

  app.controller('DemoCtrl',  function ($scope) {



  });

  app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
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
    app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });

      };
    })


    app.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';

  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    });
  };


})

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {

  $scope.items = [
    { name: 'Share', icon: 'share-arrow' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})

app.controller('coloresController', function(){
  this.color = {
    nombre: 'ORANGE TORCH',
    codigo: '254A',
    hexadecimal: 'ff6600',
    cartilla: [
      'Magic Book',
      'Domestic Wall',
      'Domestic Ultra',
      'Domestic Plus'
    ],
    linea: '43',
    base: 'Accent',
    marca: 'Paleta',
    cuarto1: 'R   0 Y 40 PTS',
    cuarto2: 'T   3 Y 12 PTS',
    cuarto3: 'V   0 Y 7 PTS',
    cuarto4: 'KX   0 Y 47 PTS',
    galon1: 'R   3 Y 16 PTS',
    galon2: 'T   13 Y 0 PTS',
    galon3: 'V   0 Y 28 PTS',
    galon4: 'KX   3 Y 44 PTS',
    cubeta1: 'R   16 Y 32 PTS',
    cubeta2: 'T   65 Y 0 PTS',
    cubeta3: 'V   2 Y 44 PTS',
    cubeta4: 'KX   19 Y 28 PTS'

  };
});

app.controller('tabsController', function(){
  this.tab = 1;
  this.selecTab = function(tab){
    this.tab = tab;
  }
});



})();
