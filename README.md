# DEVELOPERS GUIDE

[![Build Status](https://travis-ci.org/kenigbolo/node-api-server.png)](https://travis-ci.org/kenigbolo/node-api-server)

## Getting Started

+ Clone the application with `git clone https://github.com/kenigbolo/node-api-server.git` or use ssh  `git clone git@github.com:kenigbolo/node-api-server.git`.

## Dependencies

* NPM 6.6

## Description

Pure Javascript Node API server that connects to `http://api.fixer.io`. Currently available on [heroku](http://fixer-node-api.herokuapp.com). This api is currently used by a currency prediction rails app here on [github](https://github.com/kenigbolo/currency-converter.git) which is hosted on a heroku [site](https://currency-predictor.herokuapp.com). To test out the API with post man kindly use the get request params formats as stated in [fixer](http://api.fixer.io)

## NPM

This package has been published on [NPM](https://www.npmjs.com/package/node-fixer-io-api) and is freely available according to the MIT license. To install via npm simply run `npm install node-fixer-io-api`.

## NPM Package Usage
The npm package exposes a tiny utility class as well as a tiny node server. The utility class can be used to leverage making requests to the the fixer.io api. This utility will be extracted from here and made into it's own tiny package in the future. example usage of this is as follows:

```javascript

const FixerIO = require('node-fixer-io').FixerIO;
const fixerUtility = new FixerIO('put-your-api-key-here');

fixerUtility.request('latest').then((response) => {
  console.log(response);
});
```
The utility returns a resolved or rejected promise. The requirements for the request method are as follows:

`request method`

The request method takes two arguments
1. The endpoint to which the call should be made i.e At this point of writing just two are found on the fixer io api documentation. The available options at the moment are `latest`,`symbols`, `convert`, `timeseries`, `fluctuation` and `dates e.g. YYYY-MM-DD`. This value should be passed as a string. This is a required string however for flexibility it is not fixed to any specific list of endpoints in order to allow new endpoints to be accessible also.

2. The second argument taken by the request function is the query params. Kindly visit the official documentation to be sure what values are allowed but at the time of writing the allowed values are `base` and `symbol or symbols`, and these are only available on the `latest` endpoint. An example query argument should look like this `base=USD&symbols=GBP,JPY,EUR`. Please note that this type of query at the moment is not availble to the `symbols` endpoint. The `convert` endpoint allows for making queries such as `from=GBP&to=JPY&amount=200` using params `from`, `to` and `amount`. The `timeseries` and `fluctuation` endpoint currently allows queries such as `start_date=2012-05-01&end_date=2012-05-27` with the available params `start_date` and `end_date`.

## Disclaimer
I am in no way connected to those who work at fixer.io. Project is simply a side project which I will try to maintain and expand as much as I can. At the time of this writing [2018-10-25] the fixer api requires an api token when making requests.

## Bigger Picture
The idea is to integrate advanced algorithms that will give currency rates future prediction with accuracy up to 80%.
