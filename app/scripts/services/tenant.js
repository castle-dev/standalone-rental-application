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
              var tenant = properties[i][tenantId];
              tenant.propertyId = properties[i].$id;
              tenant.id = tenantId;
              deferred.resolve(tenant);
            }
          }
          deferred.reject('Tenant not found');
        });
        return deferred.promise;
      },
      updatePhoneNumber: function (tenant) {
        var tenantId = tenant.id;
        var propertyId = tenant.propertyId;
        var deferred = $q.defer();
        if (tenantId && propertyId) {
          ref.child('tenants').child(propertyId).child(tenantId).child('phoneNumber').set(tenant.phoneNumber, function (err) {
            if (err) { deferred.reject(err); }
            deferred.resolve();
          })
        } else { deferred.reject('There was an error while trying to save the tenant (property and tenant IDs required)'); }
        return deferred.promise;
      },
      linkBankAccount: function () {
        return;
      }
    };

    return Tenant;

  });

