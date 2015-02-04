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
.directive('addPropertyForm', function (Property) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/addPropertyForm.html',
    link: function (scope) {
      scope.newProperty = Property.getNewProperty();
    }
  };
});

