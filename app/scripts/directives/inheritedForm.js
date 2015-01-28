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

        if ($routeParams.address) {
          // Links to the form should always
          // have the property address in the URL
          var rpAddress = $routeParams.address;
          var address = rpAddress.replace(/_/g, ' ');
          scope.address = address;
        }

        scope.submit = function () {
          var inherited = $firebase(ref.child('inheriteds').child(scope.address)).$asArray();
          inherited.$add(scope.tenant)
            .then(function () {
              scope.successfulSubmit = true;
              $anchorScroll();
            });
        };
      }
    };
  });
