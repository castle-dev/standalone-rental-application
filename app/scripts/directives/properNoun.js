'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:properNoun
 * @description
 * # properNoun
 * Directive that restricts an input
 * to only capitalized words
 */
angular.module('propertyManagementApp')
  .directive('properNoun', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) { return; }

        var matches;
        ngModel.$parsers.unshift(function(viewValue) {
          matches = viewValue.match(/(^[A-Z][a-z]+\s?)+/);
          if (matches === null) {
            ngModel.$setValidity('properNouns', false);
          } else {
            ngModel.$setValidity('properNouns', true);
          }
          return viewValue;
        });

      }
    };
  });
