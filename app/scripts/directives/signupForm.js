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
  .directive('signupForm', function (Auth, $location) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/signupForm.html',
      link: function (scope) {
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
          Auth.registerUser(scope.newUser)
            .then(function (user) { // log the new user in
              return Auth.loginUser(user);
            })
            .then(function () { // update the user's profile
              return Auth.updateProfile({
                firstName: scope.newUser.firstName,
                lastName: scope.newUser.lastName,
                email: scope.newUser.email,
                phoneNumber: scope.newUser.phoneNumber,
              });
            })
            .then(function () { // redirect to profile page
              $location.path('/profile');
            })
            .catch(function (err) {
              scope.errors.push(err);
            });
        };
      }
    };
  });
