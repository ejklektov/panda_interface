/**
 * Created by genesis on 2016. 6. 28..
 */
var mypage = angular.module('mypage',['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider

            .when('/edit_profile',{
                templateUrl: '/edit_profile', controller: 'editProfileCtrl'
            })

            .when('/sell_product_list',{
            templateUrl: '/sell_product_list', controller: 'sellProductListCtrl'
            })
            .when('/buy_product_list',{
                templateUrl: '/buy_product_list', controller: 'buyProductListCtrl'
            })
            .when('/product_detail', {
                templateUrl: '/product_detail', controller: 'productCtrl'
            })
            .when('/mypage_profile',{
                templateUrl: '/mypage_profile', controller: 'productCtrl'
            })

    })


mypage.controller('editProfileCtrl',['$scope','$http',function($scope, $http){
    
}]);

mypage.controller('sellProductListCtrl',['$scope','$http',function($scope, $http){

}]);

mypage.controller('buyProductListCtrl',['$scope','$http',function($scope, $http){

}]);

mypage.controller('productCtrl',['$scope','$http',function($scope, $http){

}]);