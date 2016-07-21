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
    this.uploadFileToUrl = function(file, uploadUrl, id){
        var fd = new FormData();
        fd.append('file', file);

        var putImgId = function(res){
            $http.put('/admin/item/upload_product_id/'+id+'/'+res, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function(){
                    console.log();
                })
                .error(function(){
                    console.log('Code Error : item.service(fileUpload).http.put');
                });
        }

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers:{'Content-Type': undefined}
        })
            .success(function(res){
                putImgId(res);
            })
            .error(function(){
                console.log('Code Error : item.service(fileUpload).http.post')
            })
    }

    this.upload
}]);

item.controller('itemCtrl', ['$scope', 'fileUpload','$http', function($scope, fileUpload,$http) {
    $scope.uploadFile = function (id) {
        var file1 = $scope.myFile1;
        var file2 = $scope.myFile2;

        console.log('file is ');
        console.dir(file1);
        console.dir(file2);

        var uploadUrl = "http://127.0.0.1:3000/admin/";
        fileUpload.uploadFileToUrl(file1, uploadUrl, id);
        fileUpload.uploadFileToUrl(file2, uploadUrl, id);
    };

    $scope.upload_product = function () {
        var id;
        $http.post('/admin/upload_product', $scope.Item).success(function (res) {
            id = res._id;
            console.log('OK_ ?id : ' + id)
            $scope.uploadFile(id);
        });
    }

    var getItemData = function(){
        var jsonDataUrl = "/admin/item_list_data";
        $http.get(jsonDataUrl).success(function (doc) {
            console.log(doc)
            $scope.items_json = doc;
        });
    }
    getItemData();
}]);