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
  .directive('prescreenForm', function ($firebase, FIREBASE_URL, $window, $anchorScroll) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/prescreenForm.html',
      link: function (scope) {
        var ref = new $window.Firebase(FIREBASE_URL);
        var applicants = $firebase(ref.child('applicant')).$asArray();

        scope.submit = function () {
          applicants.$add(scope.applicant)
            .then(function () {
              scope.submitted = true;
              $anchorScroll();
            });
        };
      }
    };
  });
