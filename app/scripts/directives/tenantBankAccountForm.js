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
.directive('tenantBankAccountForm', function ($routeParams, $window, Tenant) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/tenantBankAccountForm.html',
    link: function (scope) {
      Tenant.getById($routeParams.tenantId)
      .then(function (tenant) { scope.tenant = tenant; })
      .catch(function () {
        $window.alert('There was an error looking up your record in the system. Please contact us at (313) 214-2663.');
        $window.location.href = 'http://entercastle.com/contact/';
      });
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
