angular.module("sistemaDelivery")
.controller('RestaurantesController',function (RestauranteService, $scope, $route, AlertService) {

  $scope.restaurantes = [];
  $scope.novoRestaurante = {};

  var modal = new bootstrap.Modal(document.getElementById('modalRestaurante'));

  $scope.carregarRestaurantes = function(status) {
      status = status || $scope.statusFiltro; 
      RestauranteService.listar(status).then(function(response) {
        console.log(response)
          $scope.restaurantes = response.data.map(function(r) {
              r.cnpjFormatado = r.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
              return r;
          });
      });
  };
  $scope.carregarRestaurantes();

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

    $scope.inativar = async function(restauranteId){
        return Swal.fire({
                title: "Você tem certeza que deseja inativar o restaurante?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try{
                        await RestauranteService.inativar(restauranteId);
                        await AlertService.success("Restaurante inativado com sucesso");
                        $route.reload();
                    }catch(error){
                        const msg = error?.data?.errors?.[0] || "Erro inesperado!";
                        AlertService.error(msg);
                    }
                }
            })
    }

    $scope.ativar = async function(restauranteId){
        return Swal.fire({
                title: "Você tem certeza que deseja ativar o restaurante?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try{
                        await RestauranteService.ativar(restauranteId);
                        await AlertService.success("Restaurante ativado com sucesso");
                        $route.reload();
                    }catch(error){
                        const msg = error?.data?.errors?.[0] || "Erro inesperado!";
                        AlertService.error(msg);
                    }
                }
            })
    }

    document.querySelectorAll('.dropdown-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            $scope.statusFiltro = this.dataset.status;

            document.getElementById('dropdown-label').textContent = "Filtro: " + this.textContent;
            document.querySelectorAll('.dropdown-item').forEach(function(i) { i.classList.remove('active'); });
            this.classList.add('active');
            
            $scope.carregarRestaurantes();
            $scope.$apply(); 
        });
    });
});
