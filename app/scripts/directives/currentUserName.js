'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:currentUserName
 * @description
 * # currentUserName
 * Directive that display's the user's first name 
 */
angular.module('propertyManagementApp')
  .directive('currentUserName', function (Auth) {
    return {
      restrict: 'E',
      template: '{{ currentUserProfile.firstName }}',
      link: function (scope) {
        Auth.getCurrentUser().then(function (currentUser) {
          scope.name = currentUser.profile.firstName;
          currentUser.profile.$bindTo(scope, 'currentUserProfile');
        });
      }

    };
  });
