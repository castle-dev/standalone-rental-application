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
          var transformedInput = text.replace(/[^0-9]/g, '');
          if(transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
          }
          return transformedInput;  // or return Number(transformedInput)
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
