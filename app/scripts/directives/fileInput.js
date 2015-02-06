'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:fileInput
 * @description
 * # fileInput
 * Directive containing template and logic
 * for uploading files from the app
 */
angular.module('propertyManagementApp')
.directive('fileInput', function (Uploader) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/fileInput.html',
    scope: {
      'output': '=for'
    },
    link: function(scope, el){
      el.find('input').bind('change', function (event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.progress = 0;
        scope.file.uploaded = false;
        Uploader.saveFile(scope.file)
        .then(function (file) {
          scope.file.uploaded = true;
          scope.output = file;
        }, function (err) {
          if (err) { scope.errors.push('There was an error uploading your file, sorry about that! Please try again'); }
        }, function (progress) {
          scope.progress = progress;
        });
        scope.$apply();
      });
    }
  };
});
