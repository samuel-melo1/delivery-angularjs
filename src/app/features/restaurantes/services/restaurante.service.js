angular.module("sistemaDelivery")
.factory("RestauranteService", function($http) {

    var baseUrl = "http://localhost:8081/restaurantes";

    return {
        listar: function() {
            return $http.get(baseUrl);
        },

        cadastrar: function(restaurante) {
            return $http.post(baseUrl, restaurante);
        }
    };

    

})