'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:signupForm
 * @description
 * # signupForm
 * Directive containing template and logic
 * for creating a new acount
 */
angular.module('propertyManagementApp')
  .directive('signupForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/signupForm.html',
      controller: 'AuthController',
      controllerAs: 'authController',
      link: function (scope, element, attr, authController) {
        scope.newUser = {};

        scope.checkEmail = function () {
          //TODO: inject User service and determine if an email is taken

        };

        scope.submit = function () {
          authController.signup(scope.newUser).then(
            function () { console.log('account created! TODO: Implement logic'); },
            function (err) { console.log('account not created!' + err); }
          );
        };
      }
    };
  });
