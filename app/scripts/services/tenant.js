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
  .factory('Tenant', function ($firebase, FIREBASE_URL, $window, $location, $q, Bank) {
    var ref = new $window.Firebase(FIREBASE_URL);

    var Tenant = {
      getById: function (id) {

        var deferred = $q.defer();
        var propertiesSyncRef = $firebase(ref.child('tenants')).$asArray();
        propertiesSyncRef.$loaded()
        .then(function (properties) {
          for (var i = 0; i < properties.length; i++) {
            if (properties[i][id]) {
              var tenant = properties[i][id];
              tenant.propertyId = properties[i].$id;
              tenant.id = id;
              deferred.resolve(tenant);
            }
          }
          deferred.reject('Tenant not found');
        });
        return deferred.promise;
      },
      updatePhoneNumber: function (tenant) {
        var deferred = $q.defer();
        if (tenant.id && tenant.propertyId) {
          ref.child('tenants').child(tenant.propertyId).child(tenant.id).child('phoneNumber').set(tenant.phoneNumber, function (err) {
            if (err) { deferred.reject(err); }
            else { deferred.resolve(); }
          });
        } else { deferred.reject('There was an error while trying to save the tenant (property and tenant IDs required)'); }
        return deferred.promise;
      },
      linkBankAccount: function (tenant, bankAccount) {
        // tokenize the bank account
        return Bank.tokenizeBankAccount(bankAccount)
        .then(function (token) {
          // store the token
          var deferred = $q.defer();
          if (tenant.id && tenant.propertyId) {
            ref.child('tenants').child(tenant.propertyId).child(tenant.id).child('bankAccountToken').set(token, function (err) {
              if (err) { deferred.reject(err); }
              else { deferred.resolve(); }
            });
          }
          return deferred.promise;
        });
      },
      saveInherited: function (inheritedTenant, address) {
        return $firebase(ref.child('tenants').child('inherited').child(address)).$push(inheritedTenant);
      },
      saveNewTenant: function (propertyId, tenant) {
        if (tenant.rent) {
          tenant.rent.label = 'Unlinked';
        }
        return $firebase(ref.child('tenants').child(propertyId)).$push(tenant);
      }
    };

    return Tenant;

  });

