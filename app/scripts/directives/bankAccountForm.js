'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:bankAccountForm
 * @description
 * # bankAccountForm
 * Directive containing template and logic
 * for updating a user's profile
 */
angular.module('propertyManagementApp')
.directive('bankAccountForm', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/bankAccountForm.html',
    link: function (scope) {
      scope.bankAccount = { };
      scope.submit = function () {
        console.log(scope.bankAccount);
      };
    }
  };
});

