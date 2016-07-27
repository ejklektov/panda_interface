/**
 * Created by genesis on 2016. 6. 28..
 */
    'use strict';
var home = angular.module('home',['ngRoute'])
     .config(function ($routeProvider) {
         $routeProvider
         //     .when('/list',{
         //         templateUrl:'/li',controller:'listCtrl'
         //     })
         //     .when('/home',{
         //         templateUrl:'/ho',controller:'practiceCtrl'
         //     })

             .when('/mypage', {
                 templateUrl: '/mypage', controller: 'mypageCtrl'
             })

             .when('/sell_product_list', {
                 templateUrl: '/sell_product_list', controller: 'mypageCtrl'
             })

             .when('/buy_product_list', {
                 templateUrl: '/buy_product_list', controller: 'mypageCtrl'
             })
             
             .when('/add_product',{
                 templateUrl:'/add_product',controller:'addProductCtrl'
             })

             .when('/search',{
                 templateUrl:'/search', controller:'searchCtrl'
             })


             .otherwise({
                 templateUrl: '/home', controller: 'homeCtrl'
             })
         })

home.controller('main',['$scope','$http',function ($scope, $http,$location) {
    $scope.view=true;

    var getAllCategory = function(){
        $http.get('/category_get_all').success(function(res){
            $scope.categories = res;
        })
    }

    getAllCategory();
}]);

home.controller('homeCtrl',['$scope','$http',function ($scope, $http,$location) {
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

home.controller('listCtrl',['$scope','$http',function ($scope, $http) {
    var incubeInfo = function () {
        $http.get('/incubeInfo').success(function (res) {
            console.log(res)
            $scope.info = res;
        })
    };
    incubeInfo();
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

home.controller('addProductCtrl',['$scope','$http',function ($scope, $http) {
    var incubeInfo = function () {
        $http.get('/incubeInfo').success(function (res) {
            console.log(res)
            $scope.info = res;
        })
    };

    incubeInfo();
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

// home.controller('mypageCtrl',['$scope','$http',function ($scope, $http) {
//
// }]);
//
// home.controller('productCtrl',['$scope','$http',function ($scope, $http) {
// <<<<<<< HEAD
//    
// =======
//
// }]);
//
// home.controller('searchCtrl',['$scope','$http',function ($scope, $http) {
// >>>>>>> 6289e386ac696df8b39d5742c4771c1ee962c947
// }]);
