'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:inheritedForm
 * @description
 * # inheritedForm
 * Directive containing template and logic
 * for signing in
 */
angular.module('propertyManagementApp')
  .directive('inheritedForm', function ($routeParams, $anchorScroll, Tenant) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/inheritedForm.html',
      link: function (scope) {

        if ($routeParams.address) {
          // Links to the form should always
          // have the property address in the URL
          var rpAddress = $routeParams.address;
          var address = rpAddress.replace(/_/g, ' ');
          scope.address = address;
        }

        scope.submit = function () {
          scope.errors = [];
          if (scope.tenant.onLease && !scope.tenant.leaseUrl) {
            scope.errors.push('We need a copy of your current lease to continue');
          } else {
            Tenant.saveInherited(scope.tenant, scope.address)
            .then(function () {
              scope.successfulSubmit = true;
              $anchorScroll();
            });
          }
        };
      }
    };
  });
