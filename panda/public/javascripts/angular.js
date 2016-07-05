/**
 * Created by genesis on 2016. 6. 28..
 */
var panda = angular.module('panda',[]);

panda.controller('pandaCtrl',['$scope','$http',function ($scope, $http) {
    var refresh = function () {
        $http.get('/data').success(function (res) {
            $scope.datas = res;
        })
    };
    refresh();
    $scope.addData = function () {
        $http.post('/data',$scope.new).success(function (res) {
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