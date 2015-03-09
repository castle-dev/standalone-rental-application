'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:creditCardForm
 * @description
 * # creditCardForm
 * Directive containing template and logic
 * for updating a user's profile
 */
angular.module('propertyManagementApp')
.directive('creditCardForm', function (Auth, Bank, Property, Flash, $location) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/creditCardForm.html',
    link: function (scope) {
      scope.cardholder = { };
      var hasBankAccountLinked = false;
      Auth.getCurrentUser().profile.$loaded().then(function (profileData) {
        scope.cardholder.fullName = profileData.firstName + ' ' + profileData.lastName;
        hasBankAccountLinked = profileData.bankAccountToken || profileData.balancedBankAccountId;
      });

      scope.$watch('expiryMonth', function (newValue) {
        scope.expiry = newValue + '/' + scope.expiryYear;
      });

      scope.$watch('expiryYear', function (newValue) {
        scope.expiry = scope.expiryMonth + '/' + newValue;
      });

      scope.callback = function (code, result) {
        scope.errors = [];
        Bank.storeCreditCardToken(code, result).then(function () {
          return Property.getCurrentUserProperties();
        }, function (err) {
          scope.errors.push(err);
        }).then(function () {
          if (hasBankAccountLinked) { // all done, back to dashboard
            Flash.setMessage('Your payment information has been linked successfully.');
            $location.path('/properties');
          } else { // on to the next one
            $location.path('/bank-account');
          }
        });
      };
    }
  };
});

