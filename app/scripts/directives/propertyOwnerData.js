'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:propertyOwnerData
 * @description
 * # propertyOwnerData
 * Directive containing template and logic
 * for displaying a single property owner
 */
angular.module('propertyManagementApp')
  .directive('propertyOwnerData', function ($routeParams, Property, Bank) {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'views/partials/propertyOwnerData.html',
      link: function (scope) {
        var propertyId = $routeParams.propertyId;
        scope.message = '';
        Property.getOwnerInfo(propertyId)
          .then(function (owner) {
            scope.owner = owner;
            return Property.getUsersProperties(owner.id);
          })
          .then(function (properties) {
            scope.properties = properties;
          });
        scope.creditBankAccount = function (bankAccountId, creditAmount){
          Bank.credit(bankAccountId, creditAmount)
          .then(function () { scope.message = 'Credit has been created.'; });
        };
        scope.acknowledge = function () {
          scope.message = '';
        };
      }
    };
  });
