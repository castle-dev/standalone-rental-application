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
      }
    };

    return Bank;

  });

