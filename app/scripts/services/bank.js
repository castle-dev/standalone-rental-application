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
  .factory('Bank', function ($location, $window, $q, $firebase, FIREBASE_URL, Auth) {
    var ref = new $window.Firebase(FIREBASE_URL);

    var Bank = {
      storeCreditCardToken: function (code, result) {
        var deferred = $q.defer();
          if (result.error) {
            deferred.reject(result.error.message);
          } else {
            Auth.getCurrentUser().then(function (currentUser) {
              var creditCardToken = $firebase(ref.child('profile').child(currentUser.uid).child('creditCardToken'));
              creditCardToken.$set(result.id).then(function () {
                deferred.resolve();
              });
            });
          }

          return deferred.promise;
      }
    };


    return Bank;

  });

