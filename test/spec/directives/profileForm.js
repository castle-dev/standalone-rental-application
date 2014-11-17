'use strict';

describe('Directive: profileForm', function() {

  var element, scope, inputs;

  // load the directive's module
  beforeEach(module('propertyManagementApp'));
  // load the cached templates
  beforeEach(module('partials'));
  // load the firebase mock
  beforeEach(module('mock.firebase'));


  beforeEach(inject(function($compile, $rootScope, $injector) {
    scope = $rootScope;
    element = angular.element(
      '<profile-form></profile-form>'
    );
    $compile(element)(scope);
    scope.$apply();
    inputs = element.find('input');
    var Auth = $injector.get('Auth');
    spyOn(Auth, 'getCurrentUser');
  }));

  it('should display a single form', function () {
    var forms = element.find('form');
    expect(forms.length).toBe(1);
  });

  it('should have a credit card number field', function () {
    var hasCreditCardInput = false;
    for(var i = 0; i < inputs.length; i++){
      if(angular.element(inputs[i]).attr('name') === 'card-number') { hasCreditCardInput = true; }
    }
    expect(hasCreditCardInput).toBe(true);
  });

  it('should have expiration date fields', function () {
    var hasExpirationMonth = false;
    var hasExpirationYear = false;
    for(var i = 0; i < inputs.length; i++){
      if(angular.element(inputs[i]).attr('name') === 'expiration-month') { hasExpirationMonth = true; }
      if(angular.element(inputs[i]).attr('name') === 'expiration-year') { hasExpirationYear = true; }
    }
    expect(hasExpirationMonth).toBe(true);
    expect(hasExpirationYear).toBe(true);
  });

  it('should have a CVV code', function () {
    var hasCvvCode = false;
    for(var i = 0; i < inputs.length; i++){
      if(angular.element(inputs[i]).attr('name') === 'security-code') { hasCvvCode = true; }
    }
    expect(hasCvvCode).toBe(true);
  });

  it('should have a submit button', function () {
    var button = angular.element(element.find('button'));
    expect(button.attr('type') === 'submit');
  });

});
