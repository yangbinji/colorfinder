(function(){

  angular.module('color.directives',[])
  .directive('colorFicha', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/color-ficha.html'
    };
  })
  .directive('barrasLaterales', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/side-nav.html'
    };
  })




})();
