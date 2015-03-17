'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.controller:TenantDashboardController
 * @description
 * # TenantDashboardController
 * Controller of the propertyManagementApp
 */
angular.module('propertyManagementApp')
  .controller('TenantDashboardController', function ($location, Tenant) {
    var vm = this;
    var now = new Date();
    vm.nextPaymentDueDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    Tenant.getAuthenticatedTenant()
    .then(function (tenant) {
      vm.tenant = tenant;
      if (!tenant.bankAccountToken && !tenant.balanacedBankAccountId) {
        $location.path('/tenants/' + tenant.$id);
      }
    });
  });
