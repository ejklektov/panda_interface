/**
 * Created by genesis on 2016. 6. 28..
 */
var practice = angular.module('practice',[])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }])

practice.controller('practiceCtrl',['$scope','$http',function ($scope, $http) {
    var incubeInfo = function () {
        $http.get('/incubeInfo').success(function (res) {
            console.log(res)
            $scope.info = res;
        })
    };

    incubeInfo();

    var token = function () {
        $http.get('/at').success(function (res) {
            $scope.at = res;
        })

    };
    token();

    $scope.me = function () {
        $http.post(
            'https://kapi.kakao.com/v1/api/talk/profile',
            {headers: { Authorization: $scope.at},'Content-Type': 'application/json; charset=utf-8'})
            .then(function(response) {
                console.log('ok');
                $scope.respon=response
                // service.currentUser = response.data.user;
                // console.log(service.currentUser);
            });
    }

    
    
    var refresh = function () {
        $http.get('/document').success(function (res) {
            $scope.docs = res;
        })
    };
    
    $scope.modify = function (id) {
        $http.put('/admin/incube/'+id,$scope.info).success(function (res) {
            incubeInfo();
        })
    }
    
    
    refresh();
    $scope.addData = function () {
        $http.post('/document',$scope.newDoc).success(function (res) {
            console.log(res);
            refresh();
        })
    };




    $scope.deleteData = function(id) {
        $http.delete('/data/'+id).success(function (res) {
            refresh();
        })
    };

    //update
    $scope.edit = function (id) {
        console.log(id);
        $http.get('/data/'+id).success(function (res) {
            $scope.new = res;
        })
    }
    $scope.update = function () {
        console.log($scope.new._id);
        $http.put('/data/'+$scope.new._id,$scope.new).success(function (res) {
            refresh();
        })
    }

    //초기화
    $scope.clear = function () {
        $scope.new = "";
    }



}]);