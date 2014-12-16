'use strict';

describe('Directive: creditCardForm', function() {

  var element, scope, inputs, q;

  // load the directive's module
  beforeEach(module('propertyManagementApp', function ($provide) {
    var mockedAuth = {
      getCurrentUser: function () {
        return {
          profile: {
            $loaded: function () {
              var deferred = q.defer();
              deferred.resolve({});
              return deferred.promise;
            }
          }
        };
      }
    };
    $provide.value('Auth', mockedAuth);
  }));
  // load the cached templates
  beforeEach(module('partials'));


  beforeEach(inject(function(Auth, $compile, $rootScope, $q) {
    q = $q;
    scope = $rootScope;
    element = angular.element(
      '<credit-card-form></credit-card-form>'
    );
    $compile(element)(scope);
    scope.$apply();
    inputs = element.find('input');
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
