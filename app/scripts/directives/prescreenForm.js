'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:prescreenForm
 * @description
 * # prescreenForm
 * Directive containing template and logic
 * for signing in
 */
angular.module('propertyManagementApp')
  .directive('prescreenForm', function ($routeParams, $location, $firebase, FIREBASE_URL) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/prescreenForm.html',
      link: function (scope) {
        var ref = new $window.Firebase(FIREBASE_URL);
        var applicants = $firebase(ref.child('applicants')).$asArray();

        if ($routeParams.address) {
          // Links to the prescreen should always
          // have the property address in the URL
          var rpAddress = $routeParams.address;
          var address = rpAddress.replace(/_/g, ' ');
          scope.propertyAddress = address;
        }

        scope.submit = function () {
          applicants.$add(scope.applicant)
            .then(function () {
              $location.path('/prescreen-submitted');
            });
        };
      }
    };
  });
