/**
 * Created by genesis on 2016. 6. 28..
 */
    'use strict';
var home = angular.module('mypage',['ngRoute'])
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

             .otherwise({
                 templateUrl: '/mypage_profile'
             })
         })

home.controller('homeCtrl',['$scope','$http',function ($scope, $http,$location) {
    $scope.choose = true;
    var incubeInfo = function () {
        $http.get('/datas').success(function (res) {
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
