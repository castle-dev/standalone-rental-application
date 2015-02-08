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
  .directive('propertiesList', function (Property, Auth) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/propertiesList.html',
      link: function (scope) {
        var promise;
        Auth.isUserAdmin().then(function (isAdmin) { 
          if (isAdmin) {
            promise = Property.getAll();
          } else {
            promise = Property.getCurrentUserProperties();
          }
          promise
          .then(function (properties) {
            scope.properties = properties;
          })
          .catch(function (err) { console.log(err); });
        });
      }
    };
  });
