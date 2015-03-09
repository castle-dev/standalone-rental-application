'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:notice
 * @description
 * # notice
 * Directive containing template
 * for displaying a notice
 */
angular.module('propertyManagementApp')
  .directive('noticeCreditCard', function (Auth) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/notice.html',
      scope: {},
      link: function (scope, elem) {
        scope.text = 'It looks like we’re missing your payment information. You’ll need to submit that information before you can receive payouts from Castle.';
        scope.nextStep = 'Submit your payment information \u2192';
        scope.linksTo = '#/credit-card';
        Auth.getCurrentUser().profile.$loaded().then(function (profileData) {
          if (!profileData.creditCardToken && !profileData.stripeCustomerId) { elem.find('.hidden').removeClass('hidden'); }
          else { elem.find('.error').addClass('hidden'); }
        });
      }
    };
  });
