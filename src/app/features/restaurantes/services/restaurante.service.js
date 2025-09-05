angular.module("sistemaDelivery")
.factory("RestauranteService", function($http) {

    var baseUrl = "http://localhost:8081/restaurantes";

    return {
        listar: function(status = "TODOS") {
            return $http.get(baseUrl + "?status=" + status)
        },
        cadastrar: function(restaurante) {
            return $http.post(baseUrl, restaurante);
        },
        inativar: function(restauranteId){
            return $http.put(baseUrl + "/inativar/" + restauranteId)
        },
        ativar: function(restauranteId){
            return $http.put(baseUrl + "/ativar/" + restauranteId)
        }
    };
})