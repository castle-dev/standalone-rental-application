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
  .factory('Bank', function ($location, $window, $firebase, FIREBASE_URL, Auth) {
    var ref = new $window.Firebase(FIREBASE_URL);

    var Bank = {
      storeCreditCardToken: function (code, result) {
          if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
          } else {
            Auth.getCurrentUser().then(function (currentUser) {
              var creditCardToken = $firebase(ref.child('profile').child(currentUser.uid).child('creditCardToken'));
              creditCardToken.$set(result.id).then(function () {
                $location.path('/welcome');
              });
            });
          }
      }
    };


    return Bank;

  });

