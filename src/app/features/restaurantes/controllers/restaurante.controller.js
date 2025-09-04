angular.module("sistemaDelivery")
.controller('RestaurantesController',function (RestauranteService, $scope, $route, $window) {

  $scope.restaurantes = [];
  $scope.novoRestaurante = {};

  var modal = new bootstrap.Modal(document.getElementById('modalRestaurante'));

  function carregarRestaurantes() {
    RestauranteService.listar().then(function(response) {
      $scope.restaurantes = response.data.map(function(r) {
        r.cnpjFormatado = r.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        return r;
      });
    });
  }

  $scope.cadastrar = async function() {
    if (!$scope.novoRestaurante.nome) {
        return AlertService.warning("É necessário informar o nome do restaurante"); 
    }

    try {
        const response = await RestauranteService.cadastrar($scope.novoRestaurante);
        $scope.restaurantes.push(response.data);
        $scope.novoRestaurante = {};
        await AlertService.success("Restaurante cadastrado com sucesso");
        modal.hide();
        $route.reload();
    } catch (error) {
        const msg = error?.data?.errors?.[0] || "Erro inesperado!";
        AlertService.error(msg);
    }
  }
  carregarRestaurantes();
});
