'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Tenant
 * @description
 * # Tenant
 * Factory containing logic for 
 * reading and writing tenant data
 */
angular.module('propertyManagementApp')
  .factory('Tenant', function ($firebase, FIREBASE_URL, $window, $location, $q) {
    var ref = new $window.Firebase(FIREBASE_URL);

    var Tenant = {
      getById: function (tenantId) {

        var deferred = $q.defer();
        var propertiesSyncRef = $firebase(ref.child('tenants')).$asArray();
        propertiesSyncRef.$loaded()
        .then(function (properties) {
          for (var i = 0; i < properties.length; i++) {
            if (properties[i][tenantId]) {
              deferred.resolve(properties[i][tenantId]);
            }
          }
          deferred.reject('Tenant not found');
        });
        return deferred.promise;
      }
    };

    return Tenant;

  });

