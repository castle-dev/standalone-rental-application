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
  .directive('inheritedForm', function ($routeParams, $window, $firebase, FIREBASE_URL, $anchorScroll) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/inheritedForm.html',
      link: function (scope) {
        var ref = new $window.Firebase(FIREBASE_URL);
        // Need to change how I add to Firebase to work with Scott's method
        // Alternatively, I can change inherited tenant info to its own
        // parent in the database
        var tenants = $firebase(ref.child('tenants')).$asArray();

        if ($routeParams.address) {
          // Links to the form should always
          // have the property address in the URL
          var rpAddress = $routeParams.address;
          var address = rpAddress.replace(/_/g, ' ');
          scope.propertyAddress = address;
        }

        scope.submit = function () {
          tenants.$add(scope.tenant)
            .then(function () {
              scope.successfulSubmit = true;
              $anchorScroll();
            });
        };
      }
    };
  });
