'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:numeric
 * @description
 * # numeric 
 * Directive that restricts an input form
 * to only numeric values
 */
angular.module('propertyManagementApp')
  .directive('numeric', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attributes, ngModelCtrl) {
        function fromUser(text) {
          var input = text;
          var transformedInput = text.replace(/[^0-9]/g, '');
          if(transformedInput !== input) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return transformedInput;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
