'use strict';

describe('Module: config', function () {

  // load the controller's module
  beforeEach(module('config'));

  var env, firebaseUrl;

  beforeEach(inject(function($injector) {
    env = $injector.get('ENV');
    firebaseUrl = $injector.get('FIREBASE_URL');
  }));


  it('should have an environment defined', function () {
    expect(env).toBeDefined();
    expect(env).not.toEqual('');
  });

  it('should have a firebase url defined', function () {
    expect(firebaseUrl).toMatch(/^https:\/\/[a-zA-Z_-]+\.firebaseio\.com\/?$/i);
  });
});
