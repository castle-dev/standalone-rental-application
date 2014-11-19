'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:error
 * @description
 * # error 
 * Directive containing template
 * for displaying an error
 */
angular.module('propertyManagementApp')
  .directive('errors', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/errors.html'
    };
  });
