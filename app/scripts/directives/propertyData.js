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
  .directive('propertyData', function ($routeParams, $anchorScroll, $timeout, Property) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/propertyData.html',
      link: function (scope) {
        scope.mode = {};
        var id = $routeParams.propertyId;
        scope.$watch('property.images', function () {
          if(scope.property && scope.property.images) {

            scope.reloadSlider = !scope.reloadSlider;
          }
        }, true); // true for deep watch, as this is an array
        Property.getPropertyData(id)
        .then(function (propertyData) {
          scope.property = propertyData;
          scope.property.id = id;
          return Property.getTenants($routeParams.propertyId);
        })
        .then(function (tenants) {
          scope.tenants = tenants;
        })
        .then(function () {
          $timeout($anchorScroll);
        });
      }
    };
  });
