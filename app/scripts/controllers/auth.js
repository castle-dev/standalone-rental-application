'use strict';

angular.module('propertyManagementApp')

  .controller('AuthController', function (Auth, $q) {

    this.signup = function (newUser) {
      var deferred = $q.defer();

      // Create new user
      Auth.registerUser(newUser).then(function (user) {
        Auth.loginUser(newUser).then(function () {
          newUser.uid = user.uid; // Get uid of the newly stored user
          deferred.resolve(Auth.updateUserProfile(newUser));
        });
      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

  });
