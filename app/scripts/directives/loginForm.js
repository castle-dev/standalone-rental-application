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
  .directive('loginForm', function (Auth, $location) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/loginForm.html',
      link: function (scope) {
        scope.redirect = Auth.getRedirect();
        if (Auth.isUserAuthenticated()) {
          Auth.isUserTenant()
          .then(
            function () { $location.path('/tenants/dashboard'); },
            function () { $location.path('/properties'); }
          );
        }
        scope.submit = function (user) {
          scope.errors = [];
          Auth.loginUser(user)
            .then(function (redirect) {
              if (redirect) {
                $location.path(redirect);
              } else {
                Auth.isUserTenant()
                .then(
                  function () { $location.path('/tenants/dashboard'); },
                  function () { $location.path('/properties'); }
                );
              }
            })
            .catch(function (err) {
              scope.errors.push(err);
            });
        };
      }
    };
  });
