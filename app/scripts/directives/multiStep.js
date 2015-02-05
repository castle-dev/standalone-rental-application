'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:multiStep
 * @description
 * # multiStep
 * Directive containing template and logic
 * for displaying state of a multi-step
 * process
 */
angular.module('propertyManagementApp')
.directive('multiStep', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/multiStep.html',
    scope: {
      'steps': '=',
      'current': '=',
      'next': '='
    },
    link: function (scope) {
      scope.current = scope.steps[0];
      scope.getStatus = function (step) {
        if (scope.steps.indexOf(step) === scope.steps.indexOf(scope.current)) {
          return 'in-progress';
        } else if (scope.steps.indexOf(step) < scope.steps.indexOf(scope.current)) {
          return 'complete';
        } else {
          return '';
        }
      };
      scope.next = function () {
        scope.current = scope.steps[scope.steps.indexOf(scope.current) + 1];
      };
    }
  };
});
