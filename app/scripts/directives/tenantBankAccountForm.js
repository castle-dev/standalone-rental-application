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
.directive('tenantBankAccountForm', function ($routeParams, $window, $location, Tenant, Flash) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/tenantBankAccountForm.html',
    link: function (scope) {
      scope.bankAccount = { };
      scope.$watch('bankAccount.accountNumber', function (newVal) {
        scope.confirmationMatches = (newVal && newVal === scope.bankAccount.confirmAccountNumber);
      });
      scope.$watch('bankAccount.confirmAccountNumber', function (newVal) {
        scope.confirmationMatches = (newVal && newVal === scope.bankAccount.accountNumber);
      });
      Tenant.getById($routeParams.tenantId)
      .then(function (tenant) {
        scope.tenant = tenant;
        scope.bankAccount.holderName = tenant.firstName + ' ' + tenant.lastName;
      })
      .catch(function () {
        $window.alert('There was an error looking up your record in the system. Please contact us at (313) 214-2663.');
        $window.location.href = 'http://entercastle.com/contact/';
      });
      scope.submit = function () {
        scope.errors = [];
        var tenant = scope.tenant;
        var bankAccount = scope.bankAccount;
        if (scope.confirmationMatches) {
          Tenant.updatePhoneNumber(tenant)
          .then(function () { return Tenant.linkBankAccount(tenant, bankAccount); })
          .then( function () {
            Flash.setMessage('<h3>You’re almost done!</h3>' +
                             '<p>In the next few days, we’ll make two small deposits into your bank account. You’ll need to confirm the amounts of those deposits in order to verify your payment information.</p>' +
                             '<p>We’ll text you at <strong>(' + tenant.phoneNumber.substring(0,3) + ') ' + tenant.phoneNumber.substring(3,6) + '-' + tenant.phoneNumber.substring(6) + '</strong> once we’ve made the deposits. Respond to the text and you’ll be good to go!');
            $location.path('/tenants/dashboard');
          })
          .catch(function (err) { scope.errors.push(err); });
        } else {
          scope.errors.push('Your bank account confirmation doesn\'t match!');
        }
      };
    }
  };
});
