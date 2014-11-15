'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:signupForm
 * @description
 * # signupForm
 * Directive containing template and logic
 * for creating a new acount
 */
angular.module('propertyManagementApp')
  .directive('signupForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/signupForm.html'
    };
  });
