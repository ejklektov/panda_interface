/**
 * Created by genesis on 2016. 6. 28..
 */
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

             .when('/edit_profile', {
                 templateUrl: '/edit_profile', controller: 'mypageCtrl'
             })

             .when('/edit_password', {
                 templateUrl: '/edit_password', controller: 'mypageCtrl'
             })

             .when('/edit_payment', {
                 templateUrl: '/edit_payment', controller: 'mypageCtrl'
             })

             .when('/product_detail', {
                 templateUrl: '/product_detail', controller: 'productCtrl'
             })

             .when('/add_product',{
                 templateUrl:'/add_product',controller:'addProductCtrl'
             })

             .when('/search',{
                 templateUrl:'/search', controller:'searchCtrl'
             })

             .when('/product_detail',{
                 templateUrl:'/product_detail', controller:'productDetailCtrl'
             })

             .otherwise({
                 templateUrl: '/home', controller: 'homeCtrl'
             })
         })


home.controller('homeCtrl',['$scope','$http',function ($scope, $http) {
    $scope.choose = true;
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

home.controller('mypageCtrl',['$scope','$http',function ($scope, $http) {

}]);

home.controller('productCtrl',['$scope','$http',function ($scope, $http) {

}]);

home.controller('searchCtrl',['$scope','$http',function ($scope, $http) {
}]);