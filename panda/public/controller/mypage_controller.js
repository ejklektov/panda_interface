/**
 * Created by genesis on 2016. 6. 28..
 */
var mypage = angular.module('practice',['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/mypage', {
                templateUrl: '/mypage', controller: 'mypageCtrl'
            })

            .when('/profile_editing',{
                templateUrl: '/profile_editing', controller: 'profileEditingCtrl'
            })

            .when('/sell_product_list',{
            templateUrl: '/sell_product_list', controller: 'sellProductListCtrl'
            })
            .when('/buy_product_list',{
                templateUrl: '/buy_product_list', controller: 'buyProductListCtrl'
            })

    })

mypage.controller('mypageCtrl',['$scope','$http',function ($scope, $http) {

}]);

mypage.controller('profileEditingCtrl',['$scope','$http',function($scope, $http)

]);

mypage.controller('sellProductListCtrl',['$scope','$http',function($scope, $http)

]);

mypage.controller('buyProductListCtrl',['$scope','$http',function($scope, $http)

]);