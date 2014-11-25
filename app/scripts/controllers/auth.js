'use strict';

angular.module('propertyManagementApp')

  .controller('AuthController', function (Auth, $q, $location, $anchorScroll) {
    this.signup = function (newUser) {
      var deferred = $q.defer();
      // Create new user
      Auth.registerUser(newUser).then(function (user) {
        Auth.loginUser(newUser).then(function () {
          newUser.uid = user.uid; // Get uid of the newly stored user
          deferred.resolve(Auth.updateUserProfile(newUser));
          $location.path('/profile/' + newUser.uid + '/edit' );
          $anchorScroll();
        }, function (err) {
          deferred.reject(err);
        });
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };
    this.login = function (user) {
      return Auth.loginUser(user).then(function (user) {
        $location.path('/profile/' + user.uid + '/edit' );
        $anchorScroll();
      });
    };
  })

  .controller('LogoutController', function (Auth, $location, $anchorScroll) {
      Auth.logoutCurrentUser();
      $location.path('/login');
      $anchorScroll();
  });
