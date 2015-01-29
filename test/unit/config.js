'use strict';

describe('Environment variables', function () {

  // load the controller's module
  beforeEach(module('config'));

  var env,
      firebaseUrl,
      stripePublishableKey,
      amazonS3PublicAccessKey,
      amazonS3PublicSecretKey,
      amazonS3PublicBucket;

  beforeEach(inject(function($injector) {
    env = $injector.get('ENV');
    firebaseUrl = $injector.get('FIREBASE_URL');
    stripePublishableKey = $injector.get('STRIPE_PUBLISHABLE_KEY');
    amazonS3PublicAccessKey = $injector.get('AMAZON_S3_PUBLIC_ACCESS_KEY');
    amazonS3PublicSecretKey = $injector.get('AMAZON_S3_PUBLIC_SECRET_KEY');
    amazonS3PublicBucket = $injector.get('AMAZON_S3_PUBLIC_BUCKET');
  }));


  it('should have an environment defined', function () {
    expect(env).toBeDefined();
    expect(env).not.toEqual('');
  });

  it('should have a firebase url defined', function () {
    expect(firebaseUrl).toMatch(/^https:\/\/[a-zA-Z_-]+\.firebaseio\.com\/?$/i);
  });

  it('should have a stripe API key defined', function () {
    expect(stripePublishableKey).toBeDefined();
    expect(stripePublishableKey).not.toEqual('');
  });

  it('should have public Amazon S3 credentials', function () {
    expect(amazonS3PublicAccessKey).toBeDefined();
    expect(amazonS3PublicAccessKey).not.toEqual('');
    expect(amazonS3PublicSecretKey).toBeDefined();
    expect(amazonS3PublicSecretKey).not.toEqual('');
    expect(amazonS3PublicBucket).toBeDefined();
    expect(amazonS3PublicBucket).not.toEqual('');
  });
});
