/**
 * Created by genesis on 2016. 6. 28..
 */
var incube = angular.module('incube',[]);

incube.controller('incubeCtrl',['$scope','$http',function ($scope, $http) {
    var refresh = function () {
        $http.get('/docu').success(function (res) {
            $scope.docus = res;
        })
    };
    refresh();
    $scope.addData = function () {
        $http.post('/docu',$scope.docu).success(function (res) {
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