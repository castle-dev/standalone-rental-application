'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:notice
 * @description
 * # notice
 * Directive containing template
 * for displaying a notice
 */
angular.module('propertyManagementApp')
  .directive('notice', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/notice.html',
      scope: {
        text: '@',
        nextStep: '@',
        linksTo: '@'
      }
    };
  });
