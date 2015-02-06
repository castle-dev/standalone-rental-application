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
        scope.$watch('signup.password.$error.pattern', function (newValue) {
          scope.passwordContainsNumber = (newValue === undefined) && !scope.signup.password.$error.required;
        });
        scope.$watch('signup.password.$error.minlength', function (newValue) {
          scope.passwordIsLongEnough = (newValue === undefined) && !scope.signup.password.$error.required;
        });

        scope.submit = function () {
          scope.errors = [];
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
            .then(function () { // redirect to home page
              $location.path('/');
            })
            .catch(function (err) {
              scope.errors.push(err);
            });
        };
      }
    };
  });
