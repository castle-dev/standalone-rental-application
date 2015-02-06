'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Uploader
 * @description
 * # Uploader
 * Factory containing logic for
 * reading and writing tenant data
 */
angular.module('propertyManagementApp')
  .factory('Uploader', function ($window, $q, AMAZON_S3_PUBLIC_BUCKET, AMAZON_S3_PUBLIC_ACCESS_KEY, AMAZON_S3_PUBLIC_SECRET_KEY) {
    var AWS = $window.AWS;
    var bucketName = AMAZON_S3_PUBLIC_BUCKET;
    var credentials = {
      accessKeyId: AMAZON_S3_PUBLIC_ACCESS_KEY,
      secretAccessKey: AMAZON_S3_PUBLIC_SECRET_KEY
    };
    AWS.config.update(credentials);
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: bucketName }});
    var Uploader = {
      saveFile: function (file) {
        var deferred = $q.defer();
        if (file && file.name && file.type) {
          var params = {
            Key: new Date().getTime() + '-' + file.name,
            ContentType: file.type,
            Body: file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function (err) {
            if (err) { deferred.reject(err.message); }
            else {
              deferred.resolve({
                bucket: bucketName,
                name: params.Key,
                url: 'https://s3.amazonaws.com/' + bucketName + '/' + params.Key
              });
            }
          })
          .on('httpUploadProgress', function (progress) {
            deferred.notify(progress.loaded / progress.total * 100);
          });
        } else { deferred.reject('File with name and type required for upload'); }
        return deferred.promise;
      }
    };
    return Uploader;
  });

