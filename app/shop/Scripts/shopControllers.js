/**
 * Create Shop Controller module
 */
'use strict'

var shopCtrl = angular.module('shopCtrl', ['shopServices']);

shopCtrl.controller('browseCtrl',['$scope', 'Products', function($scope, Products){
    $scope.name = "Shubham";
    $scope.orderCriteria = 'age';
    $scope.noOfVisibleProducts = 12;
    var data = Products.getAllProducts();
    $scope.products = data;
    $scope.defaultCategory = true;

    $scope.categoryGroup = [{name : 'Furniture', on: true},
        {name : 'Vehicles', on: true},
        {name : 'Apparels', on: true},
        {name : 'Adventure', on: true},
        {name :  'Electronics', on: true }
    ];

    $scope.localityGroup = [{name : 'Koramangala', on: true},
        {name : 'Indiranagar', on: true},
        {name : 'Ejipura', on: true},
        {name : 'Shivajinagar', on: true},
        {name :  'HSR Layout', on: true },
        {name :  'BTM Layout', on: true }
    ];

    $scope.filterCategory = function(arr){

        for(var i in $scope.categoryGroup){
            var category = $scope.categoryGroup[i]
            if(category.on && arr.category == category.name){
                return true;
            }
        }
    };


    $scope.filterLocality = function(arr){

        for(var i in $scope.localityGroup){
            var locality = $scope.localityGroup[i]
            if(locality.on && arr.locality == locality.name){
                return true;
            }
        }
    };

    $scope.categories = [
        {'name' : 'Furniture'},
        {'name' : 'Vehicles'},
        {'name' : 'Electronics'},
        {'name' : 'Apparels'},
        {'name' : 'Adventure'}
    ];
    $scope.allSubCategories = [{ 'Furniture' : ['Beds','Tables','Chairs', 'Sofas', 'Bean Bags']},
                               { 'Vehicles' : ['Bikes', 'Cars', 'Scooters']},
                               { 'Electronics' : ['AC & Coolers', 'Refigerators','TVs','Microwave']},
                               { 'Apparels' : ['Wedding Wear', 'Formal Wear', 'Costumes']},
                               { 'Adventure' : ['Camping', 'Trekking', 'Tents']}
                              ];
    $scope.subCategories = [];

    $scope.changeSubCategory = function(category){
        debugger;
        if(category === "Furniture"){
            $scope.subCategories = $scope.allSubCategories[0].Furniture;
        }
        else if(category === "Vehicles"){
            $scope.subCategories = $scope.allSubCategories[1].Vehicles;
        }
        else if(category === "Electronics"){
            $scope.subCategories = $scope.allSubCategories[2].Electronics;
        }
        else if(category === "Apparels"){
            $scope.subCategories = $scope.allSubCategories[3].Apparels;
        }
        else if(category === "Adventure"){
            $scope.subCategories = $scope.allSubCategories[4].Adventure;
        }
        else {}

    };


}]);
shopCtrl.controller('productCtrl',['$scope','$routeParams', function($scope, $routeParams){

    $scope.productId = $routeParams.productId;


}]);