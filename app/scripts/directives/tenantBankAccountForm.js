'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:tenantBankAccountForm
 * @description
 * # tenantBankAccountForm
 * Directive containing template and logic
 * for updating a tenant's bank account info
 */
angular.module('propertyManagementApp')
.directive('tenantBankAccountForm', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/tenantBankAccountForm.html',
    link: function (scope) {
      scope.name = 'Scott'; //TODO: get tenant's name
      scope.rent = 650; //TODO: get tenant's rent
      scope.bankAccount = { };
      scope.$watch('bankAccount.accountNumber', function (newVal) {
        scope.confirmationMatches = (newVal && newVal === scope.bankAccount.confirmAccountNumber);
      });
      scope.$watch('bankAccount.confirmAccountNumber', function (newVal) {
        scope.confirmationMatches = (newVal && newVal === scope.bankAccount.accountNumber);
      });
      scope.submit = function () {
        scope.errors = [];
        if (scope.confirmationMatches) {
          console.log('Matches, submitting...');
          //TODO: Store the tenant's phone number
          //TODO: Tokenize and store the tenant's bank account
        } else {
          scope.errors.push('Your bank account confirmation doesn\'t match!');
        }
        console.log(scope.bankAccount);
      };
    }
  };
});
