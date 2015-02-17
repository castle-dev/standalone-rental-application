'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:adminOnly
 * @description
 * # adminOnly
 * Directive containing logic
 * for only displaying content to admins
 * */
angular.module('propertyManagementApp')
.directive('adminOnly', function (Auth) {
  return {
    restrict: 'E',
    template: '<div ng-show="isAdmin === true" ng-transclude></div>',
    transclude: true,
    link: function (scope) {
      Auth.isUserAdmin()
      .then(function (isAdmin) {
        scope.isAdmin = isAdmin;
      });
    }
  };
});

