(function(){

  angular.module('color.directives',[])
  .directive('colorFicha', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/color-ficha.html'
    };
  })
  .directive('toolBar', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/tool-bar.html'
    };
  })
  .directive('sidenavLeft', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/sidenav-left.html'
    };
  })
  .directive('sidenavRight', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/sidenav-right.html'
    };
  })
  .directive('cartillasButton', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/cartillas-button.html'
    };
  })
  .directive('formulasFicha', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/formulas-ficha.html'
    };
  })




})();
