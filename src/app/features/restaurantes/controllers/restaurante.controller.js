angular.module("sistemaDelivery")
.controller('RestaurantesController', function (RestauranteService, $scope) {
  $scope.restaurantes = [];
  $scope.novoRestaurante = {};

  function carregarRestaurantes() {
    RestauranteService.listar().then(function(response) {
      $scope.restaurantes = response.data.map(function(r) {
        r.cnpjFormatado = r.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        return r;
      });
    });
  }

  $scope.cadastrar = function() {
    if ($scope.novoRestaurante.nome) {
      RestauranteService.cadastrar($scope.novoRestaurante)
        .then(function(response) {
          $scope.restaurantes.push(response.data); // adiciona o que voltou da API
          $scope.novoRestaurante = {};
        });
    }
  };

  carregarRestaurantes();
});