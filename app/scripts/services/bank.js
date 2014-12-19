'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Bank
 * @description
 * # Bank
 * Factory containing logic for 
 * money stuff
 */
angular.module('propertyManagementApp')
  .factory('Bank', function ($location, $window, $q, Auth) {

    var Bank = {
      storeCreditCardToken: function (code, result) {
        var deferred = $q.defer();
          if (result.error) {
            deferred.reject(result.error.message);
          } else {
            var currentUser = Auth.getCurrentUser();
            currentUser.profile.creditCardToken = result.id;
            deferred.resolve(currentUser.profile.$save());
          }

          return deferred.promise;
      },
      storeBankAccountToken: function (token) {
        var currentUser = Auth.getCurrentUser();
        currentUser.profile.bankAccountToken = token;
        return currentUser.profile.$save();
      },
      tokenizeBankAccount: function (bankAccount) {
        var deferred = $q.defer();
        if (bankAccount.holderName && bankAccount.routingNumber && bankAccount.accountNumber) {
          var newBalancedBankAccount = {
            name: bankAccount.holderName,
            /*jshint camelcase: false */
            account_number: bankAccount.accountNumber,
            routing_number: bankAccount.routingNumber,
            account_type: 'checking'
          };
          $window.balanced.bankAccount.create(newBalancedBankAccount, function (resp) {
            if (resp.errors) {
              var errors = [];
              for (var i = 0; i < resp.errors.length; i++) {
                errors.push(resp.errors[i].description);
              }
              return deferred.reject(errors);
            }
            /*jshint camelcase: false */
            var bankAccountToken = resp.bank_accounts[0].href;
            return deferred.resolve(bankAccountToken);
          });
        } else {
          deferred.reject(['Bank accounts require name, routing number, and account number']);
        }
        return deferred.promise;
      }
    };

    return Bank;

  });

