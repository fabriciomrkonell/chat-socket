angular.module("appIO", []).controller('ctrlIO', ['$scope', '$timeout', function ($scope, $timeout) {

  var socket = io();

  angular.extend($scope, {
    view: false,
    nome: "",
    mensagem: "",
    historico: [],
    usuarios: []
  });

  $scope.salvar = function(){
    angular.extend($scope, {
      view: true,
      historico: []
    });
    socket.emit('login', $scope.nome);
  };

  $scope.validar = function(){
    var n = $scope.nome;
    if (n == "") {
      return true;
    }
    return false;
  };

  $scope.enviar = function(e, mensagem, nome){
    if(e.type == "click" || e.keyCode == 13){
      socket.emit('chat message', { nome: nome, mensagem: mensagem});
      $scope.mensagem = "";
    }
  };

  socket.on('chat message', function(data){
    if ($scope.historico.length == 20){
      $scope.historico.splice(0, 1);
    }
    $scope.historico.push(data);
    $scope.$apply();
  });

  socket.on('login', function(data){
    if(data == $scope.nome){
      return false;
    }
    $scope.usuarios.push(data);
    $scope.$apply();
    $timeout(function(){
      $scope.usuarios.splice(0, 1);
    }, 5000);
  });

}]);
