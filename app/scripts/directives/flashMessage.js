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
      link: function (scope) {
        scope.message = Flash.getMessage();
        scope.dismiss = function () {
          delete scope.message;
        };
        scope.$on('flash', function (e, message) {
          scope.message = message;
        });
      }
    };
  });

