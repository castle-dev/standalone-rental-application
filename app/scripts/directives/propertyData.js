'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:propertyData
 * @description
 * # propertyData
 * Directive containing template and logic
 * for displaying a single property
 */
angular.module('propertyManagementApp')
  .directive('propertyData', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/propertyData.html'
    };
  });
