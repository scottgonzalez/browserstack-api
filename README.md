BrowserStack REST API Wrapper 
=======


(C) Pradeep Mishra <pradeep23oct@gmail.com>

A JavaScript REST wrapper for BrowserStack service for node.js (0.6.x and up).  Hides most of the complexity of creating, maintaining BrowserStack workers and sessions.


Features
--------

* Currently Work in servers (NodeJS)
* Simple service wrapper that allows you to easily put together All BrowserStack REST API libraries
* Easy create Workers, Sessions
* Automatic User credential injection on all REST calls
* Take Session screenshot.
* Model binding for each BrowserStack server response


Example usage
-------------

```javascript
var BS = require('browserstack-api');
// intialize BrowserStack with user keys
var BrowserStack = new BS('user', 'key');
// alternate method to intialize
/*
var BrowserStack = new BS;
BrowserStack.setUser('userName');
BrowserStack.setKey('myKey');
*/


// get all supported browsers 
//{all : true, flat : true} optional parameters
BrowserStack.getBrowsers({all : true, flat : true}).then(function(reponseModel){

}).fail(function(error){

});

// for getting status of account
BrowserStack.getStatus().then(function(reponseModel){

}).fail(function(error){

});

// get all workers created in account
BrowserStack.getAllWorkers().then(function(reponseModel){

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

// for creating new worker
worker.create().then(function(responseModel){

}).fail(function(err){

});

// get status of worker
worker.getStatus().then(function(responseModel){

}).fail(function(err){

});

// for taking screenshot worker
worker.takeScreenShot().then(function(responseModel){

}).fail(function(err){

});

// for destroying worker
worker.destroy().then(function(responseModel){

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
