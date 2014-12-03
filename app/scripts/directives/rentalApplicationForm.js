'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:rentalApplicationForm
 * @description
 * # rentalApplicationForm
 * Directive containing template and logic
 * for signing in
 */
angular.module('propertyManagementApp')
  .directive('rentalApplicationForm', function ($firebase, FIREBASE_URL, $window, $anchorScroll) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/rentalApplicationForm.html',
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
