angular.module("sistemaDelivery")
.controller('RestaurantesController',function (RestauranteService, $scope, $route, AlertService) {

   $scope.restaurantes = [];
   $scope.novoRestaurante = {};

   var modal = new bootstrap.Modal(document.getElementById('modalRestaurante'));
   var modalEditar = new bootstrap.Modal(document.getElementById('modalAtualizarRestaurante'));

    $scope.pageSizeOptions = [5, 10, 20, 50];
    $scope.paginacao = {
        content: [],           
        totalPages: 0,
        totalElements: 0,
        number: 0,             
        size: $scope.pageSizeOptions[0],
        first: true,
        last: true
    };
    $scope.paginasVisiveis = [];

    $scope.mudarTamanhoPagina = function() {
        $scope.carregarRestaurantes(); 
    };

    
    function gerarPaginasVisiveis(paginaAtual, totalPaginas) {
        const paginas = [];
        const range = 0; 
        paginas.push(1);

        if (paginaAtual > range + 1) {
            paginas.push('...');
        }
        for (let i = Math.max(2, paginaAtual - range + 1); i <= Math.min(totalPaginas - 1, paginaAtual + range + 1); i++) {
            paginas.push(i);
        }
        if (paginaAtual < totalPaginas - range - 1) {
            paginas.push('...');
        }
        if (totalPaginas > 1) {
            paginas.push(totalPaginas);
        }
        return [...new Set(paginas)];
    }


  $scope.carregarRestaurantes = function(page=0) {
    page = page || 0;
    const status = $scope.statusFiltro || 'TODOS'; 

    RestauranteService.listar(status, page, $scope.paginacao.size).then(function(response) {
      $scope.paginacao = response.data;
      
      $scope.paginacao.content = response.data.content.map(function(r) {
          r.cnpjFormatado = r.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
          return r;
      });

      $scope.restaurantes = $scope.paginacao.content;
      $scope.paginasVisiveis = gerarPaginasVisiveis($scope.paginacao.number, $scope.paginacao.totalPages);
    });
  };

  $scope.carregarRestaurantes();
    $scope.irParaPagina = function(page) {
      const paginaApi = page - 1;

      if (paginaApi >= 0 && paginaApi < $scope.paginacao.totalPages) {
          $scope.carregarRestaurantes(paginaApi);
      }
  };

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

    $scope.montaDadosEdicao = async function(restauranteId){
        var restaurante = $scope.restaurantes.find(r => r.id === restauranteId);
        $scope.restauranteEdicao = angular.copy(restaurante);
    }

    $scope.editar = async function(){
        return Swal.fire({
                title: "Você tem certeza que deseja editar o restaurante?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try{
                        await RestauranteService.editar($scope.restauranteEdicao.id, $scope.restauranteEdicao)
                        await AlertService.success("Restaurante editado com sucesso");
                         modalEditar.hide();
                        $route.reload();
                    }catch(error){
                        const msg = error?.data?.errors?.[0] || "Erro inesperado: " + error;
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
