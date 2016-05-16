/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $http) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.mostraMenu = function() {
      var  menuTopo =  document.getElementById('menuTopo');
      menuTopo.style.display = "block";
    }

    $scope.escondeMenu = function() {
      var  menuTopo =  document.getElementById('menuTopo');
      menuTopo.style.display = "none";
    }

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.hideMenuTopo = function () {
      $scope.escondeMenu();
    }
    $scope.showMenuTopo = function () {
      $scope.mostraMenu();
    }

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('homeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http) {
  // Set Header
  $scope.$parent.showMenuTopo();
  $scope.$parent.hideHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  // Set Motion
  $timeout(function() {
      ionicMaterialMotion.slideUp({
          selector: '.slide-up'
      });
  }, 300);

  $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 3000
      });
  }, 700);

  // Set Ink

    var trabalho = {
     contador:0,
     Id: "",
     Tema: "",
     Descricao: "",
     DataApresentacao: "",
     Ativo:false
  }
  $scope.trabalhos = [];
  $scope.infotrabalho = {
     contador: 0,
     Id: "",
     Tema: "",
     Descricao: "",
     DataApresentacao: "",
     Ativo: false
  }

  //ISRAEL ESTA E UMA ROTA FICTICIA MAS E DESTA FORMA QUE SE UTILIZA
  var rotabase = "http://localhost:8080/"
  $scope.listarTrabalhos = function() {
     $http({
         url: rotabase + 'Api/trabalhos/Listar',
         method: 'GET'
     }).success(function (data) {
         $scope.trabalhos.length = 0;
         angular.forEach(data, function (value, key) {
             trabalho.contador = key;
             trabalho.Id = data[key].Id;
             trabalho.Tema = data[key].Tema;
             trabalho.Descricao = data[key].Descricao;
             trabalho.DataApresentacao = data[key].DataApresentacao;
             trabalho.Ativo = data[key].Ativo;

             $scope.trabalhos.push(angular.copy(trabalho));
         });
         return $scope.trabalhos;
     });
  }

  $scope.visualizar = function(codigo) {
     $http({
         url: rotabase + 'Api/trabalhos/info/' + codigo,
         method: 'GET'
     }).success(function (data) {
         angular.forEach(data, function (value, key) {
             $scope.infotrabalho.contador = key;
             $scope.infotrabalho.Id = data[key].Id;
             $scope.infotrabalho.Tema = data[key].Tema;
             $scope.infotrabalho.Descricao = data[key].Descricao;
             $scope.infotrabalho.DataApresentacao = data[key].DataApresentacao;
             $scope.infotrabalho.Ativo = data[key].Ativo;
         });
         return $scope.infotrabalho;
     });
  }

})


.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.showMenuTopo();
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.hideMenuTopo();
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http) {
    // Set Header
    $scope.hideMenuTopo();
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();


        var trabalho = {
         contador:0,
         Id: "",
         Tema: "",
         Descricao: "",
         DataApresentacao: "",
         Ativo:false
     }
     $scope.trabalhos = [];
     $scope.infotrabalho = {
         contador: 0,
         Id: "",
         Tema: "",
         Descricao: "",
         DataApresentacao: "",
         Ativo: false
     }
	
     //ISRAEL ESTA VARIAVEL FICA O INICIO DO HTTP
     var rotabase = "http://localhost:3366/"

     $scope.listarTrabalhos = function() {
         $http({
             url: rotabase + 'Api/trabalhos/Listar',
             method: 'GET'
         }).success(function (data) {
             $scope.trabalhos.length = 0;
             angular.forEach(data, function (value, key) {
                 trabalho.contador = key;
                 trabalho.Id = data[key].Id;
                 trabalho.Tema = data[key].Tema;
                 trabalho.Descricao = data[key].Descricao;
                 trabalho.DataApresentacao = data[key].DataApresentacao;
                 trabalho.Ativo = data[key].Ativo;

                 $scope.trabalhos.push(angular.copy(trabalho));
             });
             return $scope.trabalhos;
         });
     }

     $scope.visualizar = function(codigo) {
         $http({
             url: rotabase + 'Api/trabalhos/info/' + codigo,
             method: 'GET'
         }).success(function (data) {
             angular.forEach(data, function (value, key) {
                 $scope.infotrabalho.contador = key;
                 $scope.infotrabalho.Id = data[key].Id;
                 $scope.infotrabalho.Tema = data[key].Tema;
                 $scope.infotrabalho.Descricao = data[key].Descricao;
                 $scope.infotrabalho.DataApresentacao = data[key].DataApresentacao;
                 $scope.infotrabalho.Ativo = data[key].Ativo;
             });
             return $scope.infotrabalho;
         });
     }
})

.controller('ActivityCtrl', function($scope, $stateParams, $ionicModal, $timeout, ionicMaterialMotion, ionicMaterialInk, $http) {
    $scope.hideMenuTopo();
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    $ionicModal.fromTemplateUrl('test-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    var trabalho = {
     contador:0,
     Id: "",
     Tema: "",
     Descricao: "",
     DataApresentacao: "",
     Ativo:false
 }
 $scope.trabalhos = [];
 $scope.infotrabalho = {
     contador: 0,
     Id: "",
     Tema: "",
     Descricao: "",
     DataApresentacao: "",
     Ativo: false
 }

 $scope.listarTrabalhos = function() {
     $http({
         url: 'Api/trabalhos/Listar',
         method: 'GET'
     }).success(function (data) {
         $scope.trabalhos.length = 0;
         angular.forEach(data, function (value, key) {
             trabalho.contador = key;
             trabalho.Id = data[key].Id;
             trabalho.Tema = data[key].Tema;
             trabalho.Descricao = data[key].Descricao;
             trabalho.DataApresentacao = data[key].DataApresentacao;
             trabalho.Ativo = data[key].Ativo;

             $scope.trabalhos.push(angular.copy(trabalho));
         });
         return $scope.trabalhos;
     });
 }

 $scope.visualizar = function(codigo) {
     $http({
         url: 'Api/trabalhos/info/' + codigo,
         method: 'GET'
     }).success(function (data) {
         angular.forEach(data, function (value, key) {
             $scope.infotrabalho.contador = key;
             $scope.infotrabalho.Id = data[key].Id;
             $scope.infotrabalho.Tema = data[key].Tema;
             $scope.infotrabalho.Descricao = data[key].Descricao;
             $scope.infotrabalho.DataApresentacao = data[key].DataApresentacao;
             $scope.infotrabalho.Ativo = data[key].Ativo;
         });
         return $scope.infotrabalho;
     });
 }

})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.hideMenuTopo();
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });


})

;
