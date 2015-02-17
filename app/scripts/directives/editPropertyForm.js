'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:editPropertyForm
 * @description
 * # editPropertyForm
 * Directive containing template and logic
 * for editing a property
 */
angular.module('propertyManagementApp')
.directive('editPropertyForm', function (Geography, Property) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/editPropertyForm.html',
    link: function (scope) {
      scope.availableStates = Geography.getAvailableStates();
      scope.rentStatuses = Property.getAvailableRentStatuses();
      scope.addIssue = function () {
        if (!scope.property.issues) { scope.property.issues = []; }
        scope.property.issues.push('');
      };
      scope.addAlert = function () {
        if (!scope.property.additionalInfo) { scope.property.additionalInfo = []; }
        scope.property.additionalInfo.push('');
      };
      scope.submit = function () {
        Property.update(scope.property, scope.tenants)
        .then(function () {
          scope.mode = {
            edit: false
          };
        });
      };
    }
  };
});

