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
}]);

product_page.controller('listCtrl',['$scope','$http',function ($scope, $http) {
    var productInfo = function () {
        $http.get('/productInfo').success(function (res) {
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

    refresh();

    $scope.addData = function () {
        $http.post('/document',$scope.newDoc).success(function (res) {
            console.log(res);
            refresh();
        })
    };


}]);
