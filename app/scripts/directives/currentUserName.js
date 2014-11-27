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
      template: '{{ profile.firstName }}',
      link: function (scope) {
        Auth.getCurrentUser().profile.$loaded().then(function (profileData) {
          scope.profile = profileData;
        });
      }
    };
  });
