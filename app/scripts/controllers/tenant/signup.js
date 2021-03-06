'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.controller:TenantSignupController
 * @description
 * # TenantSignupController
 * Controller of the propertyManagementApp
 */
angular.module('propertyManagementApp')
  .controller('TenantSignupController', function ($routeParams, $scope, $location, Tenant) {
    var vm = this;
    var id = $routeParams.tenantId;
    Tenant.getById(id)
    .then(function (tenant) {
      if (tenant.uid) { $location.path('/login'); }
      vm.tenant = tenant;
      vm.tenant.password = '';
    });
    vm.passwordContainsNumber = false;
    vm.passwordIsLongEnough = false;
    vm.submit = function () {
      vm.errors = [];
       Tenant.createUser(vm.tenant)
      .then(function (uid) {
        vm.tenant.uid = uid;
        return Tenant.update(vm.tenant);
      })
      .then(function () { $location.path('/tenants/dashboard'); })
      .catch(function (err) {
        vm.errors.push(err);
      });
    };

    $scope.$watch(function () { return vm.form && vm.form.password.$error.pattern; }, function (newValue) {
      vm.passwordContainsNumber = (newValue === undefined) && vm.form && !vm.form.password.$error.required;
    });
    $scope.$watch(function () { return vm.form && vm.form.password.$error.minlength; }, function (newValue) {
      vm.passwordIsLongEnough = (newValue === undefined) && vm.form && !vm.form.password.$error.required;
    });
  });
