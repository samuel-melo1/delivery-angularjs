angular.module("sistemaDelivery")
.config(function($routeProvider) {
  $routeProvider
    .when("/restaurantes", {
      templateUrl: "/src/app/features/restaurantes/restaurante.html",
      controller: "RestaurantesController"
    })
    .when("/produtos", {
      templateUrl: "/src/app/features/produtos/produto.html",
      controller: "ProdutosController"
    })
    .when("/home", {
      templateUrl: "/src/app/features/home/home.html",
      controller: "HomeController"
    })
    .otherwise({ redirectTo: "/home" });

});