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
.directive('editPropertyForm', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/editPropertyForm.html'
  };
});

