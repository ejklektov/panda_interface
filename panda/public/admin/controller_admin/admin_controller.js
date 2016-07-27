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

             .when('/category_edit',{
                 templateUrl: '/category_edit', controller:'categoryCtrl'
             })

             .when('/user_check',{
                 templateUrl: '/user_check', controller:'userCtrl'
             })

             .when('/footer_edit',{
                 templateUrl: '/footer_edit', controller:'footerCtrl'
             })

             .otherwise({
                 templateUrl: '/', controller: 'adminCtrl'
             })
         })

admin.controller('adminCtrl',['$scope','$http', '$location', '$window',function ($scope, $http, $location, $window) {

}]);

admin.controller('inquireAnsCtrl',['$scope','$http','$location', '$window',function ($scope, $http, $location, $window){
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
        $window.location.reload();
    }

    $scope.send_ans = function(id){
        console.log(id);
        $http.put('/admin/send_ans/'+id, $scope.new).success(function(res){
            getAllInqu();
        })
        $window.location.reload();
    }
}]);

admin.controller('categoryCtrl',['$scope','$http','$location', '$window', function ($scope, $http, $location, $window){
    //get all categories.
    var getAllCategory = function(){
        // console.log($scope.inquireText);
        $http.get('/admin/category_get_all').success(function(res){
            // console.log(res);
            $scope.categories = res;
        })
    }

    getAllCategory();

    $scope.modify_category = function(id){
        // console.log(id);
        $http.get('/admin/category_modify/'+id).success(function(res){
            // console.log(res);
            $scope.new = res;
        })
    }

    $scope.send_category = function(id){
        $http.put('/admin/send_category/'+id, $scope.new).success(function(res){
            // console.log(res);
            $window.location.reload();
        })
    }

    $scope.delete_category = function(id){
        if(confirm("삭제하시겠습니까?")){
            $http.get('/admin/delete_category/'+id).success(function(res){
            })
        }
        else{
            getAllCategory();
        }
        $window.location.reload();
    }

    $scope.add_category = function(){
        $http.post('/admin/add_category', $scope.addCategory).success(function(res){
            $window.location.reload();
        })
    }

}]);

admin.controller('userCtrl',['$scope','$http','$location', '$window', function ($scope, $http, $location, $window){
    var user_get_all = function(){
        $http.get('/admin/user_get_all').success(function(res){
            // console.log('controller_user_get_all');
            // console.log(res);
            $scope.users = res;
        })
    }
    user_get_all();

    $scope.delete_user = function(id){
        if(confirm("강퇴하시겠습니까?")){
            $http.post('/admin/delete_user/'+id).success(function(res){
            })
        }
        else{
            user_get_all();
        }
        $window.location.reload();
    }
}]);

admin.controller('footerCtrl',['$scope','$http','$location', '$window', function ($scope, $http, $location, $window){
    //get all categories.
    var getAllFooter = function(){
        // console.log($scope.inquireText);
        $http.get('/admin/get_all_footer').success(function(res){
            // console.log(res);
            $scope.categories = res;
        })
    }

    getAllFooter();

    $scope.modify_footer = function(id){
        // console.log(id);
        $http.get('/admin/modify_category/'+id).success(function(res){
            // console.log(res);
            $scope.new = res;
        })
    }

    $scope.send_footer = function(id){
        $http.put('/admin/send_footer/'+id, $scope.new).success(function(res){
            // console.log(res);
            $window.location.reload();
        })
    }

    $scope.delete_footer = function(id){
        if(confirm("삭제하시겠습니까?")){
            $http.get('/admin/delete_footer/'+id).success(function(res){
            })
        }
        else{
            getAllFooter();
        }
        $window.location.reload();
    }

    $scope.add_footer = function(){
        $http.post('/admin/add_footer', $scope.addFooter).success(function(res){
            $window.location.reload();
        })
    }

}]);


// admin.controller('itemCtrl',['$scope','$http','$location', '$window', function ($scope, $http, $location, $window){
//    
// }]);