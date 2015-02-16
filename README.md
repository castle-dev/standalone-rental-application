# propertyManagementApp

For managing properties and stuff

## Contributing

1. clone this repo
2. set environment variables
3. run ```npm install``` and ```bower install``` from the root of this repo
4. use ```grunt serve``` to serve the app for development on port 9000
5. add new commits in feature branches and submit pull requests to merge into develop

When js files are saved, all js will be linted, unit tests will run, and if both pass, the page will reload


## Environment variables

```
export ENV=develop
export FIREBASE_URL=https://castle-development.firebaseio.com/
export STRIPE_PUBLISHABLE_KEY=pk_test_ezgQYWkPV0W4Npb6E5LpMngz
export AMAZON_S3_PUBLIC_ACCESS_KEY=AKIAJDRTBGRFWMSEWWEQ
export AMAZON_S3_PUBLIC_SECRET_KEY=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
export AMAZON_S3_PUBLIC_BUCKET=uploads.entercastle.com

On OS X: launchctl setenv VARIABLE VALUE
Quit and relaunch Terminal
```

## Firebase Schema
* profile - user profiles, keyed by firebase-generated user id
  * firstName: string
  * lastName: string
  * email: string
  * phoneNumber: string
* properties - property data, keyed by user id, then property id
  * street: string
  * city: string
  * stateAbbreviation: string
  * zip: string
  * rent: int
  * thumbnail: url
  * images: array of urls
* tenants - tenant data, keyed by property id, then tenant id
  * firstName: string
  * lastName: string
  * jobTitle: string
  * employer: string
  * monthlyIncome: int
  * moveInDate: timestamp
  * picture: url
  * rent: object
    * share: int
    * label: string
    * status: enum {paid, late}
