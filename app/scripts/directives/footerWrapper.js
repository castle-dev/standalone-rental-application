'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:footerWrapper
 * @description
 * # footerWrapper
 * Directive that wraps children
 * to add a sticky footer
 */
angular.module('propertyManagementApp')
  .directive('footerWrapper', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/footerWrapper.html',
      transclude: true
    };
  });
