angular.module("sistemaDelivery")
.factory("RestauranteService", function($http) {

    var baseUrl = "http://localhost:8081";

    return {
        listar: function(status = "TODOS", page = 0, size = 5) {
            return $http.get(baseUrl + "/restaurantes?status=" + status + '&page=' + page + '&size=' + size)
        },
        cadastrar: function(restaurante) {
            return $http.post(baseUrl, restaurante);
        },
        inativar: function(restauranteId){
            return $http.put(baseUrl + "/inativar/" + restauranteId)
        },
        ativar: function(restauranteId){
            return $http.put(baseUrl + "/ativar/" + restauranteId)
        },
        editar: function(restauranteId, restaurante){
            return $http.put(baseUrl + "/atualizar/" + restauranteId, restaurante)
        }
    };
})