'use strict';

describe('Directive: inheritedForm', function() {

  var element, scope, routeParams, form;

  // load the directive's module and mock dependencies
  beforeEach(module('propertyManagementApp', function ($provide) {
    $provide.value('Auth', {});
    $provide.value('Property', {});
    $provide.value('Uploader', {});
    $provide.value('Tenant', {
      saveInherited: function () { return { then: function (callback) { return callback({}); }}} // promise mock
    });
  }));
  // load the cached templates
  beforeEach(module('partials'));


  beforeEach(inject(function($compile, $rootScope, $routeParams) {
    scope = $rootScope;
    routeParams = $routeParams;
    routeParams.address = '760 Virginia Park';
    element = angular.element(
      '<inherited-form></inherited-form>'
    );
    element = $compile(element)(scope);
    scope.$apply();
    form = scope.inherited;
  }));

  it('should respect logic', function () {
    expect(true).toBe(true);
  });

  it('should read the address from the url', function () {
    expect(scope.address).toEqual(routeParams.address);
  });

  it('should have a form', function () {
    expect(form).toBeDefined();
  });

  var enterContactInfo = function (onLease) {
    form.firstname.$setViewValue('Optimus');
    form.lastname.$setViewValue('Prime');
    form.email.$setViewValue('optimus.prime@gmail.com');
    form.phone.$setViewValue('1011011100');
    form.otheroccupants.$setViewValue('');
    form.pets.$setViewValue('');
    form.onlease.$setViewValue(onLease);
  };

  it('should require tenant contact info', function () {
    expect(form.$valid).toBeFalsy();
    enterContactInfo(false);
    expect(form.$valid).toBeTruthy();
  });

  it('should require tenants with leases to upload them', function () {
    expect(form.$valid).toBeFalsy();
    enterContactInfo(true);
    expect(form.$valid).toBeFalsy();
  });

  // Causes a page refresh which karma isn't cool with, but this is close
  xit('should submit when the form is valid', function () {
    spyOn(scope, 'submit').and.callThrough();
    enterContactInfo(false);
    element.find('form').submit();
    expect(scope.submit).toHaveBeenCalled();
  });

});
