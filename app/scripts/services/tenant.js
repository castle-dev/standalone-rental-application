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
  .factory('Tenant', function ($firebase, FIREBASE_URL, $window, $location, $q, Bank, Auth) {
    var ref = new $window.Firebase(FIREBASE_URL);

    var Tenant = {
      getAuthenticatedTenant: function () {
        var deferred = $q.defer();
        var user = Auth.getCurrentUser();
        $firebase(ref.child('indexes').child('roles').child('tenants').child(user.uid))
        .$asObject()
        .$loaded()
        .then(function (snapshot) {
          $firebase(ref.child('tenants').child(snapshot.propertyId).child(snapshot.id))
          .$asObject()
          .$loaded()
          .then(function (tenant) {
            deferred.resolve(tenant);
          }, function (err) { deferred.reject(err); });
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
      },
      requireBankAccount: function () {
        var deferred = $q.defer();
        var user = Auth.getCurrentUser();
        $firebase(ref.child('indexes').child('roles').child('tenants').child(user.uid))
        .$asObject()
        .$loaded()
        .then(function (snapshot) {
          $firebase(ref.child('tenants').child(snapshot.propertyId).child(snapshot.id))
          .$asObject()
          .$loaded()
          .then(function (tenant) {
            if (!tenant.bankAccountToken && !tenant.balancedBankAccountId) {
              $location.path('/tenants/' + tenant.$id);
            } else {
              deferred.resolve();
            }
          }, function (err) { deferred.reject(err); });
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
      },
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
      update: function (tenant) {
        var deferred = $q.defer();
        var id = tenant.id;
        var propertyId = tenant.propertyId;
        var data = {};
        angular.copy(tenant, data);
        if (id && propertyId) {
          delete data.id;
          delete data.propertyId;
          delete data.password;
          ref.child('tenants').child(propertyId).child(id).update(data, function (err) {
            if (err) { deferred.reject(err); }
            else { deferred.resolve(tenant); }
          });
        } else { deferred.reject('There was an error updating your information. Please refresh the page and try again'); }
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
        if (tenant.rent && !tenant.rent.label) {
          tenant.rent.label = 'Unlinked';
        }
        return $firebase(ref.child('tenants').child(propertyId)).$push(tenant);
      },
      createUser: function (tenant) {
        var deferred = $q.defer();
        var uid;
        Auth.registerUser(tenant)
        .then(function (authData) { // Grab the uid and log in
          uid = authData.uid;
          return Auth.loginUser(tenant);
        })
        .then(function () { // Index the new tenant user account
          return ref.child('indexes').child('roles').child('tenants').child(uid).set({
            id: tenant.id,
            propertyId: tenant.propertyId
          }, function (err) {
            if (err) { return deferred.reject(err); }
            return deferred.resolve(uid);
          });
        },
        function (err) { deferred.reject(err); });
        return deferred.promise;
      }
    };

    return Tenant;

  });

