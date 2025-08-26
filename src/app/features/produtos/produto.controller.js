angular.module("sistemaDelivery")
.controller("ProdutosController", function($scope) {
  $scope.produtos = [];
  $scope.novoProduto = {};

  $scope.cadastrar = function() {
    if ($scope.novoProduto.descricao) {
      $scope.produtos.push({
        descricao: $scope.novoProduto.descricao,
        preco: $scope.novoProduto.preco
      });
      $scope.novoProduto = {};
    }
  };

  $scope.excluir = function(index) {
    $scope.produtos.splice(index, 1);
  };
});