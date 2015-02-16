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
.directive('editPropertyForm', function (Geography) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/editPropertyForm.html',
    link: function (scope) {
      scope.availableStates = Geography.getAvailableStates();
      scope.submit = function () {
        console.log('TODO: Store the updated property and tenant data');
      };
    }
  };
});

