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
.directive('addPropertyForm', function ($location, $anchorScroll, Property, Geography, Flash, Auth) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/addPropertyForm.html',
    link: function (scope) {
      var isOnboarding = $location.search().onboarding;
      scope.availableStates = Geography.getAvailableStates();
      scope.propertyTypes = Property.getTypes();
      scope.ownershipDurations = Property.getOwnershipDurations();
      scope.newProperty = Property.getNewProperty();
      scope.newProperty.newTenants = [{}];
      scope.newProperty.stateAbbreviation = 'MI';
      scope.user = Auth.getCurrentUser();
      scope.addTenant = function () {
        scope.newProperty.newTenants.push({});
      };
      scope.deleteTenant = function ($index) {
        scope.newProperty.newTenants.splice($index, 1);
      };
      scope.submit = function () {

        if (scope.currentStep === scope.addPropertySteps[scope.addPropertySteps.length - 1]) {
          // Submitting on the last step, so save the new property
          Property.saveNewProperty()
          .then(function () { 
            if (!isOnboarding) { Flash.setMessage('Your property has been added. A member of the Castle Team will be in touch soon to talk next steps!'); }
          })
          .then(function () {
            if (isOnboarding) {
              $location.path('/properties').search({ onboarding: true });
            } else {
              $location.path('/properties');
            }
          });
        } else {
          scope.nextStep();
          $anchorScroll();
        }
      };
    }
  };
});

