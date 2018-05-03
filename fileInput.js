(function() {
    'use strict';
    angular.module('AngularModuleName').directive('fileUpload', fileUpload);

    /**
     * The Directive Function
     * Usage Example:
     * <file-upload
     *      file-upload-input-name="'name-on-input-field'"
     *      file-upload-post-url="//url/where/post/file/and/data"
     *      file-upload-additional-post-data="{property_name: 'Property Value'}"
     *      file-upload-on-upload-end="callbackFunction">
     * </file-upload>
     */
    function fileUpload() {

        return {
            restrict: 'E',
            scope: {
                'fileUploadPostUrl': '=',
                'fileUploadAdditionalPostData': '=',
                'fileUploadInputName': '=',
                'fileUploadOnUploadEnd': '='
            },
            link: Link,
            controller: FileUploadController,
            template: '<input type="file" name="{{fileUploadInputName}}">'
        };

        /**
         * Directive Link Function
         * @param scope
         * @param element
         * @param attr
         */
        function Link (scope, element, attr) {
            element.bind("change", function(event) {
                scope.postFile(element);
            });
        }

        /* Directive Controller $inject */
        FileUploadController.$inject = ['$scope', '$http'];

        /**
         * Directive Controller
         * @param $scope
         * @param $http
         * @param ServerAddress
         */
        function FileUploadController($scope, $http) {
            /**
             * @param {node} element - the dom element that fired the event
             */
            $scope.postFile = function(element) {
                var $inputElement = angular.element(element[0].querySelector('input'))[0];
                /* Create and Populate FormData */
                var formData = new FormData();
                formData.append($scope.fileUploadInputName, $inputElement.files[0]); // Append File
                for (var property in $scope.fileUploadAdditionalPostData) { /* Append Additional Data */
                    if ($scope.fileUploadAdditionalPostData.hasOwnProperty(property)) {
                        formData.append(property, $scope.fileUploadAdditionalPostData[property]);
                    }
                }
                /* Make The Request */
                MakeHttpPostRequest(formData, $inputElement);
            };

            /**
             *  Send Data To Server
             */
            function MakeHttpPostRequest(formData, $inputElement) {
                $http({
                    url: $scope.fileUploadPostUrl,
                    method: "POST",
                    data: formData,
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then(function(response) {
                    if(!!$scope.fileUploadOnUploadEnd) {
                        $scope.fileUploadOnUploadEnd(response);
                        ResetInputField($inputElement);
                    }
                }, function(error) {
                    if(!!$scope.fileUploadOnUploadEnd) {
                        $scope.fileUploadOnUploadEnd(error);
                        ResetInputField($inputElement);
                    }
                });
            }

            /**
             * Reset The Input Field
             * @param $inputElement
             */
            function ResetInputField($inputElement) {
                $inputElement.value = "";
            }

        }
    }
})();
