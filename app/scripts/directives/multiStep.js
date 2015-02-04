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
      'next': '='
    },
    link: function (scope) {
      scope._currentStep = scope.steps[0];
      scope.getStatus = function (step) {
        if (scope.steps.indexOf(step) === scope.steps.indexOf(scope._currentStep)) {
          return 'in-progress';
        } else if (scope.steps.indexOf(step) < scope.steps.indexOf(scope._currentStep)) {
          return 'complete';
        } else {
          return '';
        }
      };
      scope.next = function () {
        scope._currentStep = scope.steps[scope.steps.indexOf(scope._currentStep) + 1];
      };
    }
  };
});
