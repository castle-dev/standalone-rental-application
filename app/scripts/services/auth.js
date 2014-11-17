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
  .factory('Auth', function ($firebase, $firebaseSimpleLogin, FIREBASE_URL, $window, $rootScope) {
    var ref = new $window.Firebase(FIREBASE_URL); // firebase plugin attaches Firebase object to window
    var auth = $firebaseSimpleLogin(ref);
    var currentUser = {};

    var Auth = {
      registerUser: function (newUser) {
        return auth.$createUser(newUser.email, newUser.password);
      },
      loginUser: function (user) {
        return auth.$login('password', user);
      },
      logoutCurrentUser: function() {
        auth.$logout();
      },
      getCurrentUser: function () {
        return auth.$getCurrentUser();
      },
      isUserAuthenticated: function() {
        return !!currentUser.provider;
      },
      
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function (err, user) {
      angular.copy(user, currentUser);
      currentUser.profile = $firebase(ref.child('profile').child(currentUser.uid)).$asObject();
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function () {
      if(currentUser && currentUser.profile) {
        currentUser.profile.$destroy();
      }
      angular.copy({}, currentUser);
    });

    return Auth;

  });
