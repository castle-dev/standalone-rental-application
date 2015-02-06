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
  .directive('prescreenForm', function ($routeParams, $window, $firebase, FIREBASE_URL, $anchorScroll) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/prescreenForm.html',
      link: function (scope) {
        var ref = new $window.Firebase(FIREBASE_URL);

        if ($routeParams.address) {
          // Links to the prescreen should always
          // have the property address in the URL
          var rpAddress = $routeParams.address;
          var address = rpAddress.replace(/_/g, ' ');
          scope.address = address;
        }

        scope.submit = function () {
          var applicants = $firebase(ref.child('applications').child(scope.address)).$asArray();
          applicants.$add(scope.applicant)
            .then(function () {
              scope.successfulSubmit = true;
              $anchorScroll();
            });
        };
      }
    };
  });
