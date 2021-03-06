(function(){
  angular.module('colors.controller',[])
  .controller('cartillasController', ['$scope', '$routeParams','colorService', function($scope, $routeParams, colorService){
    var cartilla = $routeParams.cartilla;
    if(cartilla){
      colorService.byCartilla(cartilla).then(function(data){
        $scope.colores = data;
        console.log(data);
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
        console.log(data);
        $scope.colores = data;

      });
      // testRequest.color('codigo',codigo).success(function (data){
      //   $scope.unCodigo=data; // Asignaremos los datos del post
      //   console.log(data);
      //
      // });




    } else{

    }
  }])
  .controller('loadCtrl',['$scope','$timeout',function($scope, $timeout){
    $scope.showLoad = true;
   setTimeout(function ()
   {
     $scope.$apply(function()
     {
       $scope.showLoad = false;
     });
   }, 1000);

   $scope.showColors = false;
  setTimeout(function ()
  {
    $scope.$apply(function()
    {
      $scope.showColors = true;
    });
  }, 1000);

  $scope.showCircle = true;
 setTimeout(function ()
 {
   $scope.$apply(function()
   {
     $scope.showCircle = false;
   });
 }, 3000);

 $scope.showFicha = false;
setTimeout(function ()
{
  $scope.$apply(function()
  {
    $scope.showFicha = true;
  });
}, 3000);


	}])
  .controller('loadmagicCtrl',['$scope','$timeout',function($scope, $timeout){
    $scope.showLoad = true;
   setTimeout(function ()
   {
     $scope.$apply(function()
     {
       $scope.showLoad = false;
     });
   }, 7000);

   $scope.showColors = false;
  setTimeout(function ()
  {
    $scope.$apply(function()
    {
      $scope.showColors = true;
    });
  }, 7000);


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
      targetEvent: $event,
      clickOutsideToClose: false
    })
    $scope.$on('$locationChangeStart', function(event,next, current){

        $mdBottomSheet.cancel();

  });

  }


}])
.controller('BottomSheetExampleDos', ['$scope','$routeParams', '$log', '$timeout',  '$mdBottomSheet', '$mdToast', 'captura', function( $scope, $routeParams, $log, $timeout,  $mdBottomSheet, $mdToast, captura) {
$scope.alert = '';

$scope.showListBottomSheetDos = function($event) {
$scope.alert = '';
$mdBottomSheet.show({
  templateUrl: 'partials/color-ficha-dos.html',
  controller: 'fichaBusquedaCtrl',
  targetEvent: $event,
  clickOutsideToClose: false
})

$scope.$on('$locationChangeStart', function(){

    $mdBottomSheet.cancel();

});
}


}])
.controller('BottomSheetExampleTres', ['$scope','$routeParams', '$log', '$timeout',  '$mdBottomSheet', '$mdToast', 'captura', function( $scope, $routeParams, $log, $timeout,  $mdBottomSheet, $mdToast, captura) {
$scope.alert = '';

$scope.showListBottomSheetTres = function($event) {
$scope.alert = '';
$mdBottomSheet.show({
  templateUrl: 'partials/color-ficha-tres.html',
  controller: 'magicController',
  targetEvent: $event
})
}


}])


.controller('closeFicha',['$scope', '$mdToast','$mdBottomSheet', '$log', '$timeout',  function($scope,$mdToast, $mdBottomSheet, $log, $timeout){
  $scope.close = function () {
    $mdBottomSheet.cancel();

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
                roll: $scope.roll,
                email: $scope.email,
                password: $scope.password
            }

            Main.save(formData, function(res) {
                if (res.type == false) {
                  console.log('no creado');
                    $scope.errorSignup = res.data;
                } else {
                  console.log('usuario creado');

                      $scope.username = "";
                      $scope.roll = "";
                      $scope.email = "";
                      $scope.password = "";

                    $scope.successFull = { mensaje: "!Creado con éxito¡"};
                    $location.path('/signup');

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
      if($localStorage.token ){
        $scope.showAll = true;
        console.log('hay token');
      }else{
        $scope.showAll = false;
        console.log('no hay token');


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
        .hideDelay(1000)
    );
  };

  $scope.nombreCopiado = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent(' Nombre copiado :D')
        .position('bottom right')
        .hideDelay(1000)
    );
  };
  $scope.codigoCopiado = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent(' Codigo copiado :D')
        .position('bottom right')
        .hideDelay(1000)
    );
  };
  $scope.cartillaCopiada = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent(' Cartilla copiada :D')
        .position('bottom right')
        .hideDelay(1000)
    );
  };


})
.controller('favoriteCtrl', function($scope, $mdToast) {

  $scope.colorFav = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent(' Favorito :D')
        .position('bottom left')
        .hideDelay(1000)
    );
  };
})
.controller('testController', ['$scope','$filter','testRequest', function testController($scope, $filter, testRequest) {


	$scope.getColor = function(){

		$scope.unColor={};

		testRequest.color(this.modelNombre,$filter('uppercase')(this.color_codigo)).success(function (data){
			$scope.unColor=data; // Asignaremos los datos del post
      console.log(data);

      console.log($scope.unColor);
      if($scope.unColor.length < 1){
        console.log('no hay');
        $scope.errorChip = true;

      }else {
        console.log('si hay');
        $scope.errorChip = false;
      }

		})


    };

}])
// .controller('searchpalabraCtrl', ['$scope','$filter','palabraService', function testController($scope, $filter, palabraService) {
//
// 	$scope.getPalabra = function(){
// 		$scope.unaPalabra={};
//
// 		palabraService.color(this.color_palabra).success(function (data){
// 			$scope.unaPalabra=data; // Asignaremos los datos del post
//       console.log(data);
//
// 		})
//     .error(function(response, status){
//       console.log("The request failed with response ");
//
//
//     });
//
//
// 	}
// }])
.controller('fichaBusquedaCtrl', ['$scope','$filter','fichaService','captura', function($scope, $filter, fichaService, captura) {
    var cod = captura.getCodes();

		$scope.unCodigo=[];
		fichaService.color('codigo',cod).success(function (data){
			$scope.unCodigo=data; // Asignaremos los datos del post
      console.log(data);

		});

  //  $scope.selectLinea = '435X';

   $scope.getNumber = function(acutalClick){
    	$scope.currentItem = acutalClick;
    }


}])
.controller('magicController', ['$scope','$filter','$routeParams','magicService','captura', function($scope, $filter,$routeParams, magicService, captura) {
    var cart = $routeParams.cartilla;

		$scope.magic={};
		magicService.color(cart).success(function (data){
			$scope.magic=data; // Asignaremos los datos del post
      console.log(data);

		});

}])




.controller('formCtrl', function($scope,$timeout, formulasServices ) {

  $scope.datos = formulasServices;



/*  if($scope.datos){
    $timeout(function(){$scope.datos.mensaje = false}, 3000);

  } */

})
.controller('faqsCtrl',[ '$scope',function($scope){
  $scope.preguntas = [
    { titulo: "1. ¿Por qué algunos colores no tiene fórmulas?",
      respuesta: "Porque esos colores ya vienen preparados de fábrica, vienen marcados como colores de línea, no es necesaria una fórmula para prepararlos. "},
    { titulo: "2.¿Puedo buscar los colores por su nombre o únicamente por el código de color?",
      respuesta: " Puedes buscar por código, por nombre y escribiendo también una sola palabra haciendo referencia al nombre."},
    { titulo: "3. La aplicacion necesita de una conexión a internet?",
      respuesta: " Si, ya que necesita verificar los colores en una base de datos externa y de gran tamaño, por lo que si necesitas una conexión de internet  estable."},
    { titulo: "4.¿Cómo puedo recuperar mi contraseña?",
      respuesta: "Por el momento tienes que solicitarla al administrador. "},
    { titulo: "5. ¿Cuántos colores como favorito puedo tener?",
      respuesta: "Los que necesites"},
    { titulo: "",
      respuesta: ""
	}


  ];

}])
.controller('tutoCtrl',['$scope', function($scope){
    $scope.items = [
      {
        titulo: "Cartillas y Abanicos de color",
        descripcion: "Acá podrás ver todas las cartillas o categorías de color, para visualizar los colores que están contenidos en ellas debes seleccionar dando clic , lo cual      te mostrara todos los colores pertenecientes a la cartilla que seleccionaste.",
        imagen: "/img/tuto/cartilla.jpg"
      },
      {
        titulo: "Fichas de Color",
        descripcion: "Puedes seleccionar uno de los colores haciendo clic en el, lo cual te mostrará una ficha con toda la información correspondiente a este color, como el código, nombre, cartilla que pertenece y código hexadecimal.",
        imagen: "/img/tuto/cartilla.jpg"
      },
      {
        titulo: "Copiado de Información",
        descripcion: "Una de las funciones más útiles de ColorFinder es la capacidad de poder copiar la información del color con tan solo dar un clic sobre el texto que esta en la ficha y automáticamente se copiará, posterior a esto podrás pegar dicha información en cualquier documentó dentro de tu pc.",
        imagen: "/img/tuto/cartilla.jpg"
      },
      {
        titulo: "Favoritos",
        descripcion: "Otra de las funciones más útiles de ColorFinder es el poder guardar los colores como favoritos. Para ello solo has clic sobre el icono de la estrella en la ficha del color que deseas guardar como favorito y listo.Ahora para ver tus favoritos, ve al menú y en la opción de favoritos podrás ver los colores que marcaste como favoritos y poder acceder a ellos desde allí.",
        imagen:"/img/tuto/cartilla.jpg"
      },
      {
        titulo: "Fórmulas",
        descripcion: "Hay colores que tienen que ser preparados en entintadora a través de fórmulas de entintado, para ello ColorFinder cuenta con el registro de fórmulas para estos colores. Para verlas has  clic en el icono de la gotita la cual descubrirá una nueva sección en la ficha con información de la base y fórmulas que corresponde a cada línea de color según la presentacion.",
        imagen: "/img/tuto/cartilla.jpg"
      },
      {
        titulo: " ",
        descripcion: " ",
        imagen: " "
      }

    ]
}])
// .filter('normalize', function () {
//      return function (input) {
//        if (!input) return "";
//
//          input = input
//                  .replace('261A', 'xxxx')
//                  .replace('♂', 'm')
//                  .replace(/\W+/g, "");
//          return input.toLowerCase();
//      };
//    })


function DialogController($scope, $mdDialog) {


  $scope.cancel = function() {
    $mdDialog.cancel();
  };


}





})();
