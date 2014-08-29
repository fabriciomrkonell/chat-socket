angular.module("appIO", []).controller('ctrlIO', ['$scope', function ($scope) {

  var socket = io();

  angular.extend($scope, {
    view: false,
    nome: "",
    mensagem: "",
    historico: []
  });

  $scope.salvar = function(){
    angular.extend($scope, {
      view: true,
      historico: []
    });
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

}]);