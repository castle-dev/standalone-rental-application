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
  .directive('noticeBankAccount', function (Auth) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/notice.html',
      link: function (scope, elem) {
        scope.text = 'Before we can issue payouts to you, you\u2019ll need to link your bank account.';
        scope.nextStep = 'Link your bank account now \u2192';
        scope.linksTo = '#/bankAccount';
        Auth.getCurrentUser().profile.$loaded().then(function (profileData) {
          if (!profileData.bankAccountToken) { elem.find('.hidden').removeClass('hidden'); }
          else { elem.find('.error').addClass('hidden'); }
        });
      }
    };
  });
