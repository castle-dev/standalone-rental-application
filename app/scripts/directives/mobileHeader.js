'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:mobileHeader
 * @description
 * # mobileHeader
 * Directive containing template for the mobile header
 */
angular.module('propertyManagementApp')
  .directive('mobileHeader', function () {
    return {
      restrict: 'E',
      template: '<div id="mobile-header"> <div sidebar-toggle></div> <span ng-transclude></span> </div>',
      transclude: true
    };
  });

