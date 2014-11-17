'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:profileForm
 * @description
 * # profileForm
 * Directive containing template and logic
 * for updating a user's profile
 */
angular.module('propertyManagementApp')
  .directive('profileForm', function (Auth) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/profileForm.html',
      link: function (scope) {
        scope.cardholder = { };

        Auth.getCurrentUser().then(function (currentUser) {
          currentUser.profile.$bindTo(scope, 'currentUserProfile');
        });

        scope.$watch('currentUserProfile', function (newValue) {
          if (newValue !== undefined && newValue.firstName !== undefined) {
            scope.cardholder.fullName = newValue.firstName + ' ' + newValue.lastName;
          }
        });
      }
    };
  });

