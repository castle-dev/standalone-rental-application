'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:flash message
 * @description
 * # flash message
 * Directive containing template
 * for displaying a flash message
 */
angular.module('propertyManagementApp')
  .directive('flashMessage', function (Flash) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/flashMessage.html',
      link: function (scope, elem) {
        scope.message = Flash.getMessage();
        scope.dismiss = function () {
          elem.addClass('hidden');
        };
      }
    };
  });

