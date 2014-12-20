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
.directive('bankAccountForm', function (Bank, $location) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/bankAccountForm.html',
    link: function (scope) {
      scope.bankAccount = { };
      scope.submit = function () {
        Bank
        .tokenizeBankAccount(scope.bankAccount)
        .then(function (token) { return Bank.storeBankAccountToken(token); })
        .then(function () { $location.path('/properties'); })
        .catch(function (errors) { scope.errors = errors; });
      };
    }
  };
});

