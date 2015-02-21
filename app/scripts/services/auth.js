'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Auth
 * @description
 * # Auth
 * Factory containing logic for
 * authenticating users
 */
angular.module('propertyManagementApp')
  .factory('Auth', function ($firebase, FIREBASE_URL, $window, $location, $q) {
    var ref = new $window.Firebase(FIREBASE_URL); // firebase plugin attaches Firebase object to window
    var currentUser = {};
    var redirect = null;

    var Auth = {
      registerUser: function (newUser) {
        var deferred = $q.defer();
        ref.createUser({
          email: newUser.email,
          password: newUser.password
        }, function (err) {
          if (err) { deferred.reject(Auth.translateError(err)); }
          deferred.resolve(newUser);
        });
        return deferred.promise;
      },
      loginUser: function (user) {
        var deferred = $q.defer();
        ref.authWithPassword(user, function (err) {
          if (err) { deferred.reject(Auth.translateError(err)); }
          deferred.resolve(redirect || '/properties');
          redirect = null;
        });
        return deferred.promise;
      },
      logoutCurrentUser: function () {
        ref.unauth();
        $location.path('/login');
      },
      getCurrentUser: function () {
        if (!Auth.isUserAuthenticated()) {
          redirect = $location.path();
          $location.path('/login');
        }
        return currentUser;
      },
      isUserAuthenticated: function () {
        return !!currentUser.uid;
      },
      isUserAdmin: function () {
        var deferred = $q.defer();
        $firebase(ref.child('admins').child(currentUser.uid))
        .$asObject()
        .$loaded()
        .then(function (data) {
          deferred.resolve(data.$value);
        });
        return deferred.promise.then(function (data) {
          return !!data;
        });
      },
      updateProfile: function (profile) {
        var profileRef = $firebase(ref.child('profile'));
        return profileRef.$set(Auth.getCurrentUser().uid, profile);
      },
      getRedirect: function () {
        return redirect;
      },
      translateError: function (err) {
        if (err.code === 'INVALID_EMAIL') {
          return 'Invalid email. Please check that you have entered a valid email address';
        } else if (err.code === 'INVALID_PASSWORD') {
          return 'Looks like that password is incorrect. Need help? Contact us at support@entercastle.com or (313) 214-2663';
        } else if (err.code === 'EMAIL_TAKEN') {
          return 'That email is already associated with a Castle account. Please use another email address or contact us at (313) 214-2663 for help.';
        } else if (err.code === 'INVALID_USER') {
          return 'Hmm... we can\'t find that email in our system';
        } else {
          return err;
        }
      }

    };

    ref.onAuth(function (authData) {
      if (authData) {
        // User just logged in, cache their data
        angular.copy(authData, currentUser);
        currentUser.profile = $firebase(ref.child('profile').child(currentUser.uid)).$asObject();
      } else {
        // User just logged out
        if(currentUser && currentUser.profile) {
          currentUser.profile.$destroy();
        }
        angular.copy({}, currentUser);
      }
    });

    return Auth;

  });
