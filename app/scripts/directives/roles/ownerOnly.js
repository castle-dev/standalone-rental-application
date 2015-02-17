'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:ownerOnly
 * @description
 * # ownerOnly
 * Directive containing logic
 * for only displaying content to property owners
 * */
angular.module('propertyManagementApp')
.directive('ownerOnly', function (Auth) {
  return {
    restrict: 'E',
    template: '<div ng-show="isAdmin === false" ng-transclude></div>',
    transclude: true,
    link: function (scope) {
      Auth.isUserAdmin()
      .then(function (isAdmin) {
        scope.isAdmin = isAdmin;
      });
    }
  };
});


