'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Property
 * @description
 * # Property
 * Factory for getting data about properties
 * from the database
 */
angular.module('propertyManagementApp')
  .factory('Property', function ($firebase, FIREBASE_URL, $window, $q, Auth, Tenant) {
    var ref = new $window.Firebase(FIREBASE_URL);
    var _newProperty = {};

    var Property = {
      getAll: function () {
        var deferred = $q.defer();
        var allProperties = [];
        $firebase(ref.child('profile'))
        .$asArray()
        .$loaded()
        .then(function (users) {
          var finished = 0;
          users.forEach(function (user) {
            $firebase(ref.child('properties').child(user.$id))
            .$asArray()
            .$loaded()
            .then(function (properties) {
              properties.forEach(function (property) {
                property.owner = user.firstName + ' ' + user.lastName;
              });
              allProperties = allProperties.concat(properties);
              finished += 1;
              if (finished === users.length) {
                deferred.resolve(allProperties);
              }
            });
          });
        })
        .catch(deferred.reject);
        return deferred.promise;
      },
      getCurrentUserProperties: function () {
        var deferred = $q.defer();
        Auth.isUserAdmin()
        .then(function (isAdmin) {
          if (isAdmin) {
            deferred.resolve(Property.getAll());
          } else {
            $firebase(ref.child('properties').child(Auth.getCurrentUser().uid))
            .$asArray()
            .$loaded()
            .then(function (currentUserProperties) {
              deferred.resolve(currentUserProperties);
            })
            .catch(function (err) {
              deferred.reject(err);
            });
          }
        });
        return deferred.promise;
      },
      getPropertyData: function (id) {
        var deferred = $q.defer();
        ref.child('indexes').child('properties').child(id).once('value', function (snapshot) {
          ref.child('properties').child(snapshot.val().uid).child(id).once('value', function (snapshot) {
            deferred.resolve(snapshot.val());
          }, deferred.reject);
        });
        return deferred.promise;
      },
      getTenants: function (id) {
        var promise = $firebase(ref.child('tenants').child(id))
        .$asArray()
        .$loaded()
        .then(function (tenants) {
          // translate server time to client time
          var deferred = $q.defer();
          $firebase(ref.child('.info/serverTimeOffset'))
          .$asObject()
          .$loaded()
          .then(function (snapshot) {
            var offset = snapshot.$value;
            for (var i = 0; i < tenants.length; i++) {
              tenants[i].moveInDate += offset;
            }
            deferred.resolve(tenants);
          });
          return deferred.promise;
        });
        return promise;
      },
      getNewProperty: function () {
        return _newProperty;
      },
      saveNewProperty: function () {
        var uid = Auth.getCurrentUser().uid;
        var propertiesSync = $firebase(ref.child('properties').child(uid));
        if (_newProperty.lease && _newProperty.lease.url) {
          _newProperty.documents = [];
          _newProperty.documents.push({
            name: 'Uploaded Lease',
            url: _newProperty.lease.url
          });
        }
        return propertiesSync.$asArray().$add(_newProperty).then(function (ref) {
          var tenant = _newProperty.tenant;
          var propertyId = ref.key();
          if (tenant.firstName && tenant.lastName) {
            return Tenant.saveNewTenant(propertyId, tenant);
          }
        }).then(function () {
          _newProperty = {};
        });
      },
      update: function (property, tenants) {
        var deferred = $q.defer();
        var id = property.id;
        if (property.documents) {
          property.documents.forEach(function (doc) {
            delete doc.$$hashKey; // Hack to make firebase & angular play nice
          });
        }
        ref.child('indexes').child('properties').child(id).once('value', function (snapshot) {
          ref.child('properties').child(snapshot.val().uid).child(id).update(property, function (err) {
            if (err) { deferred.reject(err); }
            if (!tenants.length) { deferred.resolve(); }
            var count = 0;
            tenants.forEach(function (tenant) {
              if (isNaN(tenant.moveInDate)) {
                delete tenant.moveInDate;
              }
              tenants.$save(tenant).then(function () {
                count++;
                if (count === tenants.length) {
                  deferred.resolve();
                }
              });
            });
          });
        });
        return deferred.promise;
      },
      getTypes: function () {
        return [
          'Single-family home',
          'Duplex',
          'Triplex',
          'Condo',
          'Other'
        ];
      },
      getOwnershipDurations: function () {
        return [
          'Just acquired',
          'Less than 1 year',
          '1-5 years',
          'More than 5 years'
        ];
      },
      getAvailableRentStatuses: function () {
        return [
          'invited',
          'linked',
          'paid',
          'late'
        ];
      }
    };

    return Property;

  });
