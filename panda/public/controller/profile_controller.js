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
                 templateUrl: '/mypage_profile', controller: 'mypageCtrl'
             })
         })

home.controller('mypageCtrl',['$scope','$http',function ($scope, $http,$location) {
    $scope.choose = true;
    var findMe = function () {
        $http.get('/findMe').success(function (res) {
            // console.log(res)
            $scope.me = res;
            $scope.splitEmail=res.email.split('@');
            $scope.front=res.phone.substring(0,3);
            $scope.middle=res.phone.substring(3,7);
            $scope.rear=res.phone.substring(7,11);
        })
    };
    findMe();
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

    $scope.modifyUserData = function () {
        // console.log('===============================modify : ' + id);
        // console.log($scope.person);
        $scope.person.phone = $scope.person.front + $scope.person.middle + $scope.person.rear;
        $scope.person.email = $scope.person.mail +"@"+ $scope.person.domain;

        // var splitEmail = email.split('@');
        // var phoneFront = phone.substring(0,3);
        // var phoneMiddle = phone.substring(4,8);
        // var phoneRear= phone.substring(9,12);

        $http.put('/profile',$scope.person).success(function (res) {
            console.log(res);
            findMe();

            // $scope.front=phoneFront;
            // $scope.middle=phoneMiddle;
            // $scope.rear=phoneRear;
            // $scope.mail=splitEmail[0];
            // $scope.domain=splitEmail[1];

        })
    };

    $scope.addWord = function(){
        $http.post('/addWord',$scope.newDoc).success(function (res) {
            console.log(res);
            // $scope.info = res;
        })
    }
}])