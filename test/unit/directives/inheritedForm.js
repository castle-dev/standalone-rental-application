'use strict';

describe('Directive: inheritedForm', function() {

  var element, scope, inputs, routeParams;

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
    $compile(element)(scope);
    scope.$apply();
    inputs = element.find('input');
  }));

  it('should respect logic', function () {
    expect(true).toBe(true);
  });

  it('should read the address from the url', function () {
    expect(scope.address).toEqual(routeParams.address);
  });

});
