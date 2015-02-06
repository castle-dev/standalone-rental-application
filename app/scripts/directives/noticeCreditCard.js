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
        scope.text = 'It appears we don\'t have a valid credit card on file for your account';
        scope.nextStep = 'Enter your credit card info \u2192';
        scope.linksTo = '#/creditCard';
        Auth.getCurrentUser().profile.$loaded().then(function (profileData) {
          if (profileData.notices && profileData.notices.creditCard) { elem.find('.hidden').removeClass('hidden'); }
          else { elem.find('.error').addClass('hidden'); }
        });
      }
    };
  });
