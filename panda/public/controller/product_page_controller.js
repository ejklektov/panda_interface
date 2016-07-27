/**
 * Created by genesis on 2016. 6. 28..
 */
var product_page = angular.module('product_page',['ngRoute'])
     .config(function ($routeProvider, $locationProvider) {
         $routeProvider
         //         .when('/list',{
         //             templateUrl:'/li',controller:'listCtrl'})
         //         .when('/home',{
         //             templateUrl:'/ho',controller:'practiceCtrl'})
             .when('/product_item_buy',{
                 templateUrl:'/product_item_buy',
                 controller: 'productCtrl'
             })

             .when('/product_item/:id',{
                 templateUrl:'/',
                 controller: 'productCtrl',
                 resolve:
                 {}
             })

             .otherwise({
                 templateUrl: '/',
                 controller: 'productCtrl'
             })
         })

product_page.controller('productCtrl',['$scope','$http','$routeParams',function ($scope, $http, $location) {
    $scope.choose = true;
    
    var refresh = function () {
        $http.get('/document').success(function (res) {
            $scope.docs = res;
        })
    };
    
    var token = function () {
        $http.get('/at').success(function (res) {
            $scope.at = 5;//res;
        })
    };
    token();
    
    
    refresh();
    $scope.addData = function () {
        $http.post('/document',$scope.newDoc).success(function (res) {
            console.log(res);
            refresh();
        })
    };

    $scope.addWord = function(){
        $http.post('/addWord',$scope.newDoc).success(function (res) {
            console.log(res);
            refresh();
        })
    }

    $scope.buyProduct = function(){
        $http.post('/product_item_buy').success(function(res){
            console.log(res);
        })
    }

    //
    // var id = JSON.parse('<%= id_product %>');
    // $scope.init = function(stringifiedArray) {
    //     id = JSON.parse(stringifiedArray);
    // }


    console.log('bbbbbbbbbbbbbbbbbbbbb')
    $http.get('/product_item_info').success(function (res) {
        console.log('aaaaaaaaaaaaaaaaaaaa')
        console.log(res)
        $scope.items_json_target = res;
    }).error(function (err) {
        console.log('Access error product_page_controller.js productCtrl $http.get.product/product_item:id')
        console.log(err)
    })
    
}]);
