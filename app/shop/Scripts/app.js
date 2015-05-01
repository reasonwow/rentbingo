'use strict';

/*Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.product',
    'myApp.browse',
    'myApp.version'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/browse'});
    }]);
*/

var app = angular.module('shopApp',['ngRoute','shopCtrl','shopServices']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/browse',{
            templateUrl : 'browse/browse.html',
            controller : 'browseCtrl'
        })
        .when('/product/:productId', {
            templateUrl : 'product/product.html',
            controller : 'productCtrl'
        })
        .otherwise({
            redirectTo : '/browse'
        });
}]);