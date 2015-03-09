'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.controller:PasswordResetEmailController
 * @description
 * # PasswordResetEmailController
 * Controller of the propertyManagementApp
 * reponsible for sending password reset emails
 * to users
 */
angular.module('propertyManagementApp')
  .controller('PasswordResetEmailController', function (Auth) {
    var vm = this;
    console.log('PasswordResetEmailController loaded');

    this.sendEmail = function () {
      console.log('Sending password reset email');
      vm.errors = [];
      Auth.sendPasswordResetEmail(vm.email)
      .then(function () { vm.emailSent = true; })
      .catch(function (err) { vm.errors.push(err); });
    };
  });
