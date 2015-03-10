'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:propertyOwnerData
 * @description
 * # propertyOwnerData
 * Directive containing template and logic
 * for displaying a single property owner
 */
angular.module('propertyManagementApp')
  .directive('propertyOwnerData', function ($routeParams, Property) {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'views/partials/propertyOwnerData.html',
      link: function (scope) {
        var propertyId = $routeParams.propertyId;
        Property.getOwnerInfo(propertyId)
          .then(function (owner) {
            scope.owner = owner;
            return Property.getUsersProperties(owner.id);
          })
          .then(function (properties) {
            scope.properties = properties;
          });
      }
    };
  });
