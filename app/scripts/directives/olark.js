'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:olark
 * @description
 * # olark
 * Directive for displaying olark chat help
 * to only olark values
 */
angular.module('propertyManagementApp')
  .directive('olark', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/olark.html',
      scope: {
        'showHelp': '=help'
      }
    };
  });
