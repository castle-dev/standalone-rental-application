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
.directive('addPropertyForm', function ($location, Property, Geography, Flash) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/addPropertyForm.html',
    link: function (scope) {
      scope.availableStates = Geography.getAvailableStates();
      scope.propertyTypes = Property.getTypes();
      scope.ownershipDurations = Property.getOwnershipDurations();
      scope.newProperty = Property.getNewProperty();
      scope.newProperty.stateAbbreviation = 'MI';
      scope.submit = function () {

        if (scope.currentStep === scope.addPropertySteps[scope.addPropertySteps.length - 1]) {
          // Submitting on the last step, so save the new property
          Property.saveNewProperty()
          .then(function () { Flash.setMessage('Your property has been added. A member of the Castle Team will be in touch soon to talk next steps!'); })
          .then(function () { $location.path('/'); });
        } else {
          scope.nextStep();
        }
      };
    }
  };
});

