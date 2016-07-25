/**
 * Created by genesis on 2016. 6. 28..
 */
    'use strict';
var nav = angular.module('nav',['ngRoute']);

nav.controller('navCtrl',['$scope','$http',function ($scope, $http,$location) {
    $scope.view=true;
}]);