'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.controller:PropertiesController
 * @description
 * # PropertiesController
 * Controller of the propertyManagementApp
 */
angular.module('propertyManagementApp')
  .controller('PropertiesController', function (Property) {
    var vm = this;
    Property.getCurrentUserProperties()
    .then(function (properties) {
      vm.properties = properties;
    });
  });
