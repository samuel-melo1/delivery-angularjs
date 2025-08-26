angular.module("sistemaDelivery")
.controller("RestaurantesController", function($scope) {
  $scope.restaurantes = [];
  $scope.novoRestaurante = {};

  $scope.cadastrar = function() {
    if ($scope.novoRestaurante.nome) {
      $scope.restaurantes.push({
        nome: $scope.novoRestaurante.nome,
        endereco: $scope.novoRestaurante.endereco,
        cnpj: $scope.novoRestaurante.cnpj
      });
      $scope.novoRestaurante = {};
    }
  };

  $scope.excluir = function(index) {
    $scope.restaurantes.splice(index, 1);
  };
});