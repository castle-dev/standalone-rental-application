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
.directive('fileInput', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/fileInput.html',
    link: function(scope, el){
      el.find('input').bind('change', function(event){
        scope.progress = 60;
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        //TODO: upload the file
        scope.$apply();
      });
    }
  };
});
