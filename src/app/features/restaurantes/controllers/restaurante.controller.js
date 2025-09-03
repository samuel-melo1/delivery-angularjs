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

  $scope.cadastrar = function() {
    if (!$scope.novoRestaurante.nome) {
      Swal.fire({
          title: "É necessário informar o nome do restaurante",
          icon: "warning",
          draggable: true
        })
        return 
    }

    RestauranteService.cadastrar($scope.novoRestaurante)
      .then(function(response) {
        $scope.restaurantes.push(response.data);
        $scope.novoRestaurante = {};
        modal.hide()

        Swal.fire({
          title: "Restaurante cadastrado com sucesso",
          icon: "success",
          draggable: true
        })
        $route.reload();
      })
      .catch(function(error){
        let msg = (error.data && error.data.errors) ? error.data.errors[0] : "Erro inesperado!";
        Swal.fire({
          title: msg,
          icon: "error",
          draggable: true
        })
      });
  }
  carregarRestaurantes();
});
