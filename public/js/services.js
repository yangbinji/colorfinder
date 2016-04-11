(function(){
  angular.module('colores.services', [])
  .factory('colorService', ['$http', '$q', function($http, $q){
    function all(){
      var deferred = $q.defer();

      $http.get('color.json', {cache: true})
        .success(function(data){
          console.log(data);
          deferred.resolve(data);

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
    return{
      all: all,
      byCartilla: byCartilla,
      byCodigo: byCodigo

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
  })
  .factory('formulasServices', function(){
    return {mensaje: false}

  })
  .factory('perfilService', function(){
    return {perfil: false}
  })
  .factory('testRequest', function($http) { //declaramos la factory
		var path = "http://162.243.47.51:8083/";//API path
		return {

			color : function(palabra,codigo){ //retornara el post por el id
				global = $http.get(path+palabra+"/"+codigo, {cache: true});
				return global;
			}
		}
	})
  .factory('fichaService', function($http) { //declaramos la factory
		var path = "http://162.243.47.51:8082/";//API path
		return {

			color : function(palabra,codigo){ //retornara el post por el id
				global = $http.get(path+palabra+"/"+codigo, {cache: true});
				return global;
			}
		}
	})

  .factory('magicService', function($http) { //declaramos la factory
		var path = "http://162.243.47.51:8083/libro/";//API path
		return {

			color : function(cart){ //retornara el post por el id
				global = $http.get(path+cart, {cache: true});
				return global;
			}
		}
	})
  .factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "http://162.243.47.51:9000";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me/').success(success).error(error)
            },

            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }
]);
})();
