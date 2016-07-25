/**
 * Created by genesis on 2016. 7. 22..
 */
    'use strict';
var admin = angular.module('admin',['ngRoute'])
     .config(function ($routeProvider) {
         $routeProvider
             // .when('/search',{
             //     templateUrl:'/search', controller:'searchCtrl'
             // })

             .when('/inquire_answer',{
                 templateUrl: '/inquire_answer', controller: 'inquireAnsCtrl'
             })
             
             .otherwise({
                 templateUrl: '/', controller: 'adminCtrl'
             })
         })

admin.controller('adminCtrl',['$scope','$http',function ($scope, $http,$location) {
    var user_get_all = function(){
        $http.get('/admin/user_get_all').success(function(res){
            console.log('controller_user_get_all');
            console.log(res);
            $scope.users = res;
        })
    }
    user_get_all();
}]);


admin.controller('inquireAnsCtrl',['$scope','$http','$location',function ($scope, $http, $location){
    //get all inquire.
    var getAllInqu = function(){
        // console.log($scope.inquireText);
        $http.get('/admin/inquire_get_all').success(function(res){
            // console.log(res);
            $scope.inquires = res;
        })
    }

    getAllInqu();

    $scope.inquire_ans = function (id) {
        $http.get('/admin/inquire_ans/'+id).success(function (res) {
            // console.log('답변');
            // console.log(res);
            $scope.new=res;
        })
    }

    $scope.delete_ans = function (id) {
        if(confirm("삭제하시겠습니까?")){
            $http.put('/admin/delete_ans/'+id).success(function (res) {
                getAllInqu();
            })
        }
        else{
            getAllInqu();
        }
    }

    $scope.send_ans = function(id){
        console.log(id);
        $http.put('/admin/send_ans/'+id, $scope.new).success(function(res){
            getAllInqu();
        })
    }
}]);