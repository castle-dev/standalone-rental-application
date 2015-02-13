/*jshint newcap:false*/
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
  .directive('propertiesList', function (Property, ngTableParams, $filter) {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/propertiesList.html',
      link: function (scope) {
        Property.getCurrentUserProperties()
        .then(function (properties) {
          scope.properties = properties;
          scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
              street: 'asc'
            }
          }, {
            total: scope.properties.length, // length of scope.properties
            getData: function($defer, params) {
                var orderedData = params.sorting() ?
                  $filter('orderBy')(scope.properties, params.orderBy()) :
                  scope.properties;

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
          });
        })
        .catch(function (err) { console.log(err); });

      }
    };
  });
