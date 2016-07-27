/**
 * Created by genesis on 2016. 6. 28..
 */
'use strict';
var item = angular.module('item',['ngRoute'])
    // .config(function ($routeProvider) {
    //     $routeProvider
    //         .otherwise({
    //             templateUrl: '/FAQ',controller:'FAQCtrl'
    //         })
    // })
item.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
])

item.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

item.service('kakaolink', ['$http', function ($http) {
    this.kakaolink = function(token){
        console.log("token is "+token);
        $http.post('kapi.kakao.com/v1/api/talk/memo/send', {
            transformRequest: angular.identity,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' +token
            },
            data: {template_id:"794"}
        })
            .success(function(res){
                console.log('ok');
            })
            .error(function(){
                console.log('no');
            });
    }
}]);

item.controller('itemCtrl', ['$scope', 'kakaolink','$http', function($scope, kakaolink,$http){
    var getToken = function () {
        $http.get('/token').success(function (res) {
            $scope.token = res;
            console.log($scope.token);
        })
    }
    getToken();
    $scope.kakaol = function(){
        console.log('token is ');
        console.log($scope.token);

        // console.log(token);
        kakaolink.kakaolink($scope.token);
    };
    $scope.katlink = function () {
        $http.get('/katlink').success(function (res) {
            console.log('ok');
        })
    }
}]);