'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:propertyData
 * @description
 * # propertyData
 * Directive containing template and logic
 * for displaying a single property
 */
angular.module('propertyManagementApp')
  .directive('propertyData', function ($routeParams, Property) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/propertyData.html',
      link: function (scope) {
        Property.getPropertyData($routeParams.propertyId)
        .then(function (propertyData) {
          scope.property = propertyData;
          return Property.getTenants($routeParams.propertyId);
        })

        .then(function (tenants) {
          scope.tenants = tenants;
        });
      }
    };
  });
