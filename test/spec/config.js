'use strict';

describe('Module: config', function () {

  // load the controller's module
  beforeEach(module('config'));

  var env, firebaseUrl, stripeApiKey;

  beforeEach(inject(function($injector) {
    env = $injector.get('ENV');
    firebaseUrl = $injector.get('FIREBASE_URL');
    stripeApiKey = $injector.get('STRIPE_API_KEY');
  }));


  it('should have an environment defined', function () {
    expect(env).toBeDefined();
    expect(env).not.toEqual('');
  });

  it('should have a firebase url defined', function () {
    expect(firebaseUrl).toMatch(/^https:\/\/[a-zA-Z_-]+\.firebaseio\.com\/?$/i);
  });

  it('should have a stripe API key defined', function () {
    expect(env).toBeDefined();
    expect(env).not.toEqual('');
  });
});
