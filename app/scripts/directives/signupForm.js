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
        scope.newUser = { password: '' };

        scope.$watch('newUser.password', function (newValue) {
          scope.passwordIsLongEnough = newValue && (newValue.length > 7);
          var matches = scope.newUser.password.match(/\d+/g);
          scope.passwordContainsNumber = (matches !== null);
        });

        scope.submit = function () {
          scope.errors = [];
          if (!scope.passwordIsLongEnough || !scope.passwordContainsNumber) {
             return scope.errors.push('That password isn\'t sercure! Please include a number and make it at least 8 characters long');
          }
          authController.signup(scope.newUser).catch( function (err) { 
            if (err.code === 'INVALID_EMAIL') {
              scope.errors.push('Invalid email. Please check that you have entered a valid email address');
            } else if (err.code === 'INVALID_PASSWORD') {
              scope.errors.push('Invalid password. Please check that you have entered a secure password');
            } else if (err.code === 'EMAIL_TAKEN') {
              scope.errors.push('That email is already associated with a Castle account. Please use another email address or contact us at (313) 214-2663 for help.');
            } else {
              scope.errors.push(err);
            }
          });
        };
      }
    };
  });
