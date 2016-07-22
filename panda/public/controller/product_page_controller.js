/**
 * Created by genesis on 2016. 6. 28..
 */
var product_page = angular.module('product_page',['ngRoute'])
     .config(function ($routeProvider) {
         $routeProvider
         //         .when('/list',{
         //             templateUrl:'/li',controller:'listCtrl'})
         //         .when('/home',{
         //             templateUrl:'/ho',controller:'practiceCtrl'})
             .when('/product_item_buy',{
             templateUrl:'/product_item_buy', controller: 'productCtrl'
            })
             .otherwise({
                 templateUrl: '/', controller: 'productCtrl'
             })
         })

product_page.controller('productCtrl',['$scope','$http',function ($scope, $http) {
    $scope.choose = true;
    var productInfo = function () {
        $http.get('/product_detail').success(function (res) {
            console.log(res)
            $scope.info = res;
        })
    };
    productInfo();
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


    var getItemData = function(){
        var jsonDataUrl = "/admin/item_list_data";
        $http.get(jsonDataUrl).success(function (doc) {
            console.log(doc)
            $scope.items_json = doc;
        });
    }
    getItemData();
}]);
