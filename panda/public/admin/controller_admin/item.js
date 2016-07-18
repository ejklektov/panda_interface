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

            .success(function(){
                console.log('ok');
            })

            .error(function(){
                console.log('no');
            });
    }
}]);

item.controller('itemCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        var file2 = $scope.myFile2;

        console.log('file is ' );
        console.dir(file);
        console.dir(file2);

        var uploadUrl = "http://127.0.0.1:3000/admin/";
        fileUpload.uploadFileToUrl(file, uploadUrl);
        fileUpload.uploadFileToUrl(file2, uploadUrl);
    };
}]);