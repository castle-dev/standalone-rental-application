'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:addPropertyForm
 * @description
 * # addPropertyForm
 * Directive containing template and logic
 * for updating a user's profile
 */
angular.module('propertyManagementApp')
.directive('addPropertyForm', function (Property, Geography) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/addPropertyForm.html',
    link: function (scope) {
      scope.availableStates = Geography.getAvailableStates();
      scope.propertyTypes = Property.getTypes();
      scope.ownershipDurations = Property.getOwnershipDurations();
      scope.newProperty = Property.getNewProperty();
      scope.submit = function () {
        scope.nextStep();
      };
    }
  };
});

