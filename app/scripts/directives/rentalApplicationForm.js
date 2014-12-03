'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:rentalApplicationForm
 * @description
 * # rentalApplicationForm
 * Directive containing template and logic
 * for signing in
 */
angular.module('propertyManagementApp')
  .directive('rentalApplicationForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/rentalApplicationForm.html',
      link: function (scope) {
        scope.submit = function () {
          console.log('to space!');
        }
      }
    };
  });
