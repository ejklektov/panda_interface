/**
 * Created by genesis on 2016. 6. 28..
 */
    'use strict';
var help = angular.module('help',['ngRoute'])
     .config(function ($routeProvider) {
         $routeProvider
         //     .when('/list',{
         //         templateUrl:'/li',controller:'listCtrl'
         //     })
         //     .when('/home',{
         //         templateUrl:'/ho',controller:'practiceCtrl'
         //     })

             .when('/FAQ', {
                 templateUrl: '/FAQ', controller: 'FAQCtrl'
             })
             .when('/FAQ_edit',{
                templateUrl: '/FAQ_edit', controller:'FAQCtrl'
            })

             .when('/app', {
                 templateUrl: '/app', controller: 'appCtrl'
             })
             .when('/notice', {
                 templateUrl: '/notice', controller: 'noticeCtrl'
             })

             .when('/request', {
                 templateUrl: '/request', controller: 'requestCtrl'
             })

             .when('/modify_FAQ', {
                 templateUrl: '/modify_FAQ', controller: 'FAQCtrl'
             })

             .when('/inquire', {
                 templateUrl: '/inquire', controller: 'inquireCtrl'
             })

             .otherwise({
                 templateUrl: '/FAQ',controller:'FAQCtrl'
             })
         })

help.controller('FAQCtrl',['$scope','$http','$location',function ($scope, $http,$location) {
    var FAQS;
    var FAQ = function(){
        $http.get('/FAQ_get').success(function(res){
            // console.log(res);
            $scope.FAQS = res;
            FAQS = res;
        })
    }
    FAQ();

    $scope.modify_FAQ = function (id) {
        $http.get('/admin/modify_FAQ/'+id).success(function (res) {
            // console.log(res);
            $scope.new=res;
        })
    }

    $scope.delete_FAQ = function (id) {
        if(confirm("삭제하시겠습니까?")){
            $http.get('/admin/delete_FAQ/'+id).success(function (res) {
                FAQ();
            })
        }
        else{
            FAQ();
        }
    }

    $scope.send_FAQ = function(id){
       // console.log(id);
       $http.put('/admin/send_FAQ'+id,$scope.new).success(function(res){
           FAQ();
        })
    }

    $scope.add_FAQ = function(){
        $http.post('/admin/add_FAQ',$scope.addFAQ).success(function(res){
            FAQ();
        })
    }
}]);

help.controller('inquireCtrl',['$scope','$http','$location',function ($scope, $http, $location){
    var getInqu = function(){
        // console.log($scope.inquireText);
        $http.get('/inquire_get').success(function(res){
            // console.log(res);
            $scope.inquires = res;
        })
    }

    getInqu();

    $scope.registInqu = function(){
        // console.log('currentInquire');
        // console.log($scope.curInqu);
        $http.post('/inquire_regist', $scope.curInqu).success(function(res){
            $scope.inquire = res;
        })
        getInqu();
    }
}]);
