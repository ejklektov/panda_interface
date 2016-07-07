/**
 * Created by genesis on 2016. 6. 28..
 */
var mypage = angular.module('practice',['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/mypage', {
                templateUrl: '/mypage', controller: 'mypageCtrl'
            })

            .when('/edit_profile',{
                templateUrl: '/edit_profile', controller: 'editProfileCtrl'
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

mypage.controller('editProfileCtrl',['$scope','$http',function($scope, $http){

<<<<<<< HEAD
{}]);
=======
}]);
>>>>>>> f323e77d2df9bab5fbb628d8ba54f83a1be439b6

mypage.controller('sellProductListCtrl',['$scope','$http',function($scope, $http){

<<<<<<< HEAD
{}]);
=======
}]);
>>>>>>> f323e77d2df9bab5fbb628d8ba54f83a1be439b6

mypage.controller('buyProductListCtrl',['$scope','$http',function($scope, $http){

<<<<<<< HEAD
{}]);
=======
}]);
>>>>>>> f323e77d2df9bab5fbb628d8ba54f83a1be439b6
