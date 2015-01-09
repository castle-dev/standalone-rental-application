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
      link: function (scope, elem) {
        scope.text = 'You need to have a valid credit card on file';
        scope.nextStep = 'Enter your credit card info \u2192';
        scope.linksTo = '#/creditCard';
        Auth.getCurrentUser().profile.$loaded().then(function (profileData) {
          if (!profileData.creditCardToken && !profileData.stripeCustomerId) { elem.find('.hidden').removeClass('hidden'); }
          else { elem.find('.error').addClass('hidden'); }
        });
      }
    };
  });
