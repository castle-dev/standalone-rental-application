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
      'currentStep': '='
    },
    link: function (scope) {
      scope.getStatus = function (step) {
        if (scope.steps.indexOf(step) === scope.steps.indexOf(scope.currentStep)) {
          return 'in-progress';
        } else if (scope.steps.indexOf(step) < scope.steps.indexOf(scope.currentStep)) {
          return 'complete';
        } else {
          return '';
        }
      };
    }
  };
});
