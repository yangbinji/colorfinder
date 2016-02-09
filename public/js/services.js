(function(){
  angular.module('colores.services', [])
  .factory('colorService', ['$http', '$q', function($http, $q){
    function all(){
      var deferred = $q.defer();

      $http.get('/colores.json', {cache: true})
        .success(function(data){
          deferred.resolve(data);

        });
        return deferred.promise;
    }

    function byCodigo(codigo){
      var deferred = $q.defer();
      all().then(function(data){
        var results = data.filter(function(color){
          return color.codigo === codigo;
        });
          deferred.resolve(results);
      });
      return deferred.promise;
    }
    function byCartilla(cartilla){
      var deferred = $q.defer();
      all().then(function(data){
        var results = data.filter(function(color){
          return color.cartilla === cartilla;
        });
        deferred.resolve(results);
      });
      return deferred.promise;
    }
    return{
      all: all,
      byCodigo: byCodigo,
      byCartilla: byCartilla
    }
  }])
  .factory('captura',  function(){
    var  codigo = "initial value"; // <== variable que reciba del controllar capturaCtrl
    return{
      getCodes: function(){
        return codigo;
      },
      setCodes: function(value) {
        codigo = value;
        return value;
      }
    }
  });
})();
