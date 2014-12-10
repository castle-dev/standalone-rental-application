'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:propertiesList
 * @description
 * # propertiesList
 * Directive containing template and logic
 * for creating a new acount
 */
angular.module('propertyManagementApp')
  .directive('propertiesList', function ($window) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/propertiesList.html',
      link: function (scope) {
        scope.addProperty = function () {
          $window.alert('Todo!');
        };
      }
    };
  });
