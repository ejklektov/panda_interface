/**
 * Created by genesis on 2016. 6. 28..
 */

var item = angular.module('item', []);

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

item.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function(res){})
            .error(function(){
                console.log('no');
            });
    }
}]);

item.controller('itemCtrl', ['$scope', 'fileUpload','$http', function($scope, fileUpload,$http){
    $scope.uploadFile = function(id){
        var file1 = $scope.myFile1;
        var file2 = $scope.myFile2;

        console.log('file is ');
        console.dir(file1);
        console.dir(file2);

        var uploadUrl = "http://127.0.0.1:3000/admin/";
        fileUpload.uploadFileToUrl(file1, uploadUrl, id);
        fileUpload.uploadFileToUrl(file2, uploadUrl, id);
    };

    $scope.upload_product = function(){
        var id;
        $http.post('/admin/upload_product',$scope.Item).success(function(res){
            id = res._id;
            console.log('OK_ ?id : '+id)
            $scope.uploadFile(id);
        });
    }
    
}]);