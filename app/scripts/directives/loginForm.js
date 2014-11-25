'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:loginForm
 * @description
 * # loginForm
 * Directive containing template and logic
 * for signing in
 */
angular.module('propertyManagementApp')
  .directive('loginForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/loginForm.html',
      controller: 'AuthController',
      controllerAs: 'authController',
      link: function (scope, element, attr, authController) {
        scope.submit = function (user) {
          scope.errors = [];
          authController.login(user).catch(function (err) {
            scope.errors.push(err);
          });
        };
      }
    };
  });
