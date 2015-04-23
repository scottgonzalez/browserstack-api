[![NPM](https://nodei.co/npm/browserstack-api.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/browserstack-api/)&nbsp;&nbsp;
[![Build Status](https://travis-ci.org/pradeep-mishra/browserstack-api.svg?branch=master)](https://travis-ci.org/pradeep-mishra/browserstack-api)


BrowserStack REST API Wrapper 
=======


(C) Pradeep Mishra <pradeep23oct@gmail.com>

A JavaScript REST wrapper for BrowserStack service for node.js (0.6.x and up).  Hides most of the complexity of creating, maintaining BrowserStack workers and sessions.


Features
--------

* Currently Work on servers (NodeJS)
* Simple service wrapper that allows you to easily put together All BrowserStack REST API libraries
* Easy create Workers, Sessions
* Automatic User credential injection on all REST calls
* Take Session screenshot.
* Model binding for each BrowserStack server response


Example usage
-------------

```javascript
var BS = require('browserstack-api');

// instantiate browserstack-api with userName and key
var BrowserStack = new BS('userName', 'myKey');

// an alternate method to set username and key after creating an instance of browserstack-api

var BrowserStack = new BS;
BrowserStack.setUser('userName');
BrowserStack.setKey('myKey');


// get all supported browsers list
//{all : true, flat : true} optional parameters
BrowserStack.getBrowsers({all : true, flat : true}).then(function(reponseModel){
    console.log(responseModel.toJSON());
}).fail(function(error){

});

// get status of an account
BrowserStack.getStatus().then(function(reponseModel){
    console.log(responseModel.toJSON());
}).fail(function(error){

});

// get all workers created in account
BrowserStack.getAllWorkers().then(function(reponseModel){
    console.log(responseModel.toJSON());
}).fail(function(error){

});

// methods available in BrowserStack instance
getEndPoint(String, nthString);
setKey(String); //'myKey'
setUser(String); // 'username'
setCredentials(Object); //{user : 'username', key : 'myKey}
setAPIVersion(Number); // 3
getBrowsers();
getStatus();
getAllWorkers();


// Worker Instance
// Worker class extend DataModel or responseModel
var worker = new BrowserStack.Worker;
worker.setOS('windows')
.setOSVersion(7)
.setBrowser('chrome')
.setBrowserVersion('20.0')
.setURL('http://google.com'); 
// create new worker on browserStack
worker.create().then(function(responseModel){
	console.log(responseModel.toJSON());
}).fail(function(err){

});

// get status of worker
worker.getStatus().then(function(responseModel){
    console.log(responseModel.toJSON());
}).fail(function(err){

});

// for taking screenshot of worker
worker.takeScreenShot().then(function(responseModel){
    console.log(responseModel.toJSON());
}).fail(function(err){

});

// for destroying worker
worker.destroy().then(function(responseModel){
    console.log(responseModel.toJSON());
}).fail(function(err){

});

// methods available in Worker instance
setOS(String); //'windows'
setOSVersion(String); // '7'
setBrowser(String); // 'chrome'
setDevice(String); //'ios'
setBrowserVersion(String); //'20.0'
setURL(String); //http://in.linkedin.com/in/ipradeepmishra/
setName(String); // 'pradeep'
setBuild(String); 
setProject(String);
setTimeout(Number); // 30
create();
destroy();
getStatus();
takeScreenShot();

// DataModel or responseModel class
// methods available
get(String); // name
set(String, String) // name, value
has(String); // name
where(String, String) // key, value
toJSON(); // return JSON representation of model




```

```bash
npm install browserstack-api --save
```
