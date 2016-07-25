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
    var findUser = function () {
        $http.get('/findUser').success(function (res) {
            console.log('findUser');
            console.log(res);
            // $scope.me = res;
            $scope.splitEmail = res.email.split('@');
            $scope.front = res.phone.substring(0,3);
            $scope.middle = res.phone.substring(3,7);
            $scope.rear = res.phone.substring(7,11);
            $scope.bank = res.bank;
            $scope.account = res.account;
            $scope.major = res.major;

            console.log($scope.splitEmail[0]);
        })
    };
    findUser();


    $scope.modifyUserData = function () {
        var person = {phone:"", email:"", bank:"", account:"", major:""};

        console.log(person);
        console.log('modify');
        console.log($scope.splitEmail[0]);

        person.phone = $scope.front + $scope.middle + $scope.rear;
        person.email = $scope.splitEmail[0] +"@"+ $scope.splitEmail[1];
        person.bank = $scope.bank;
        person.account = $scope.account;
        person.major = $scope.major;

        console.log(person);

        $http.put('/profile', person).success(function (res) {
            // console.log(res);
            $http.get('/mypage_profile').success(function(res){
            })
            findUser();
        })
    };
    
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


    $scope.addWord = function(){
        $http.post('/addWord',$scope.newDoc).success(function (res) {
            console.log(res);
            // $scope.info = res;
        })
    }
}])