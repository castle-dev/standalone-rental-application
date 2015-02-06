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
.directive('addPropertyForm', function ($location, Property, Geography) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/addPropertyForm.html',
    link: function (scope) {
      scope.availableStates = Geography.getAvailableStates();
      scope.propertyTypes = Property.getTypes();
      scope.ownershipDurations = Property.getOwnershipDurations();
      scope.newProperty = Property.getNewProperty();
      scope.submit = function () {
        if (scope.currentStep === scope.addPropertySteps[scope.addPropertySteps.length - 1]) {
          // Last step, save the new property
          Property.saveNewProperty()
          .then(function () { $location.path('/'); });
        } else {
          scope.nextStep();
        }
      };
    }
  };
});

