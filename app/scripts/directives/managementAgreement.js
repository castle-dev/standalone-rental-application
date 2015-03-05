'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:managementAgreement
 * @description
 * # managementAgreement
 * Directive containing template
 * for Castle's management agreement
 */
angular.module('propertyManagementApp')
  .directive('managementAgreement', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/managementAgreement.html'
    };
  });

