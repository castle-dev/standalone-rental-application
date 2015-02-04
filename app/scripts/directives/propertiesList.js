'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:propertiesList
 * @description
 * # propertiesList
 * Directive containing template and logic
 * for displaying a list of properties
 */
angular.module('propertyManagementApp')
  .directive('propertiesList', function (Property) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/propertiesList.html',
      link: function (scope) {
        Property.getCurrentUserProperties()
        .then(function (properties) {
          scope.properties = properties;
        });
      }
    };
  });
