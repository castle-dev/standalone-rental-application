'use strict';

angular.module('propertyManagementApp')

  .controller('AuthController', function (Auth, $q) {

    this.signup = function (newUser) {
      var deferred = $q.defer();

      // Create new user
      Auth.registerUser(newUser).then(function (user) {
        console.log(user);
        Auth.loginUser(newUser).then(function () {
          console.log(newUser.email + ' is now logged in');
          deferred.resolve(newUser);
          //TODO: Create user's profile
        });
      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

  });
