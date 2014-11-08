var request = require('request'),
	Q = require('q'),
	path = require('path'),
	util = require("util");

var DataModel = function(obj){
	var self = this;
	self.attribs = obj || {};
	self.get = function(item){
		if(item && self.attribs && self.attribs[item] ){
			return self.attribs[item];
		}
		return null;
	}
	self.set = function(item, value){
		if(item && typeof(item) === "string"){
			self.attribs[item] = value;
		}else if(item && typeof(item) === "object" && !util.isArray(item)){
			Object.keys(item).forEach(function(key){
				self.attribs[key] = item[key];
			});
		}
		return self;
	}
	self.has = function(item){
		if(item && typeof(self.attribs[item]) !== "undefined"){
			return true;
		}
		return false;
	}
	self.where = function(key, value){
		if(self.attribs && util.isArray(self.attribs)){
			return self.attribs.filter(function(item){
				if(item && typeof(item) === "object" && item[key] === value){
					return true;
				}
			});
		}
		return [ ];
	}

	self.toJSON = function(){
		return JSON.parse(JSON.stringify(self.attribs));
	}
}

var	BrowserStack = function(user, key){
	var me = this;
	this.user = user;
	this.key = key;
	this.url = "http://api.browserstack.com/";
	this.version = 3;

	this.getEndPoint = function(){
		var args = Array.prototype.splice.call(arguments, 0);
		args = args.join('/');
		return path.join(me.url, String(me.version), args).replace(":/", "://");
	}
	this.Worker = function(attribs){
		var self = this;
		DataModel.call(this);
		if(typeof(attribs) === "string"){
			attribs = { id : attribs};
		}
		this.attribs = attribs || {};
		if(!this.attribs.timeout){
			this.attribs.timeout = 30;
		}
		this.setOS = function(osname){
			if(osname){
				this.attribs.os = osname;
			}
			return this;
		}
		this.setOSVersion = function(version){
			if(version){
				this.attribs.os_version = version;
			}
			return this;
		}
		this.setBrowser = function(browser){
			if(browser){
				this.attribs.browser = browser;
			}
			return this;
		}
		this.setDevice = function(device){
			if(device){
				this.attribs.device = device;
			}
			return this;
		}
		this.setBrowserVersion = function(bversion){
			if(bversion){
				this.attribs.browser_version = bversion;
			}
			return this;
		}
		this.setURL = function(url){
			if(url){
				this.attribs.url = url;
			}
			return this;
		}
		this.setName = function(name){
			if(name){
				this.attribs.name = name;
			}
			return this;
		}
		this.setBuild = function(build){
			if(build){
				this.attribs.build = build;
			}
			return this;
		}
		this.setProject = function(project){
			if(project){
				this.attribs.project = project;
			}
			return this;
		}
		this.setTimeout = function(timeout){
			if(!isNaN(timeout)){
				self.attribs.timeout = Number(timeout);
			}
			return self;
		}
		this.create = function(){
			if(self.attribs.id){
				throw new Error("worker already created with id " + self.attribs.id);
			}
			if(!self.attribs || 
				!self.attribs.os || 
				!self.attribs.os_version || 
				!self.attribs.url ||
				!self.attribs.browser ||
				!self.attribs.browser_version){
					throw new Error("os, os_version, browser, browser_version and url parameters are mandatory");
			}
			var future = Q.defer();
			var url = me.getEndPoint('worker');
			request.post({
				url : url,
				'auth' : {
				    'user': me.user,
				    'pass': me.key,
				    'sendImmediately': true
				},
				json : self.toJSON()
			}, function(err, res, body){
				if(res && res.statusCode === 200){
					if(typeof(body) !== "object"){
						try{
							body = JSON.parse(body);
						}catch(e){						
						}						
					}
					self.attribs.id = body.id;
					return future.resolve(new DataModel(body));
				}
				return future.reject((err || body));
			});
			return future.promise;
		}

		this.destroy = function(){
			if(!self.attribs.id){
				throw new Error("no worker found to destroy");
			}
			var url = me.getEndPoint('worker', self.attribs.id);
			console.log(url);
			var future = Q.defer();
			request.del({
				'url' : url,
				'auth' : {
				    'user': me.user,
				    'pass': me.key,
				    'sendImmediately': true
				}
			}, function(err, res, body){
				if(res && res.statusCode === 200){
					if(typeof(body) !== "object"){
						try{
							body = JSON.parse(body);
						}catch(e){						
						}						
					}
					return future.resolve(new DataModel(body));
				}
				return future.reject((err || body));
			});	
			return future.promise;	

		}

		this.getStatus = function(){
			if(!self.attribs.id){
				throw new Error("no worker found to get status");
			}
			var url = me.getEndPoint('worker', self.attribs.id);
			var future = Q.defer();
			request.get({
				'url' : url,
				'auth' : {
				    'user': me.user,
				    'pass': me.key,
				    'sendImmediately': true
				}
			}, function(err, res, body){
				if(res && res.statusCode === 200){
					if(typeof(body) !== "object"){
						try{
							body = JSON.parse(body);
						}catch(e){						
						}						
					}
					return future.resolve(new DataModel(body));
				}
				return future.reject((err || body));
			});	
			return future.promise;	

		}

		this.takeScreenShot = function(format){
			if(!self.attribs.id){
				throw new Error("no Worker id found");
			}
			format = format || "png";
			var future = Q.defer();
			var url = me.getEndPoint('worker', self.attribs.id, 'screenshot.' + format);
			request.get({
				url : url,
				'auth' : {
				    'user': me.user,
				    'pass': me.key,
				    'sendImmediately': true
				},
				json : self.toJSON()
			}, function(err, res, body){
				if(res && res.statusCode === 200){
					if(typeof(body) !== "object"){
						try{
							body = JSON.parse(body);
						}catch(e){						
						}						
					}
					return future.resolve(new DataModel(body));
				}
				return future.reject((err || body));
			});
			return future.promise;
		}

	}

	this.validateAuth = function(){
		if(!me.user || !me.key){
			throw new Error("please set credentials first");
		}
	}

	this.setKey = function(key){
		if(key){
			this.key = key;
		}
		return this;
	}

	this.setUser = function(user){
		if(user){
			this.user = user;
		}
		return this;
	}

	this.setCredentials = function(cred){
		if(cred && typeof(cred) === "object" && 
			cred.user && 
			cred.key){
				this.user = cred.user;
				this.key = cred.key;
		}
		return this;
	}

	this.setAPIVersion = function(version){
		if(version && !isNaN(version)){
			this.version = version;
		}
		return this;
	}

	this.getBrowsers = function(opt){
		me.validateAuth();
		opt = opt || {};
		var url = me.getEndPoint('browsers'),
			query = [];
		if(opt.all){
			query.push('all=true');
		}
		if(opt.flat){
			query.push('flat=true');
		}
		if(query.length){
			url += ("?" + query.join('&'));
		}
		var future = Q.defer();
		request.get({
			'url' : url,
			'auth' : {
			    'user': me.user,
			    'pass': me.key,
			    'sendImmediately': true
			}
		}, function(err, res, body){
			if(res && res.statusCode === 200){
				if(typeof(body) !== "object"){
					try{
						body = JSON.parse(body);
					}catch(e){						
					}						
				}
				return future.resolve(new DataModel(body));
			}
			return future.reject((err || body));
		});	
		return future.promise;
	}

	this.getStatus = function(){
		me.validateAuth();
		var url = this.getEndPoint('status');
		var future = Q.defer();
		request.get({
			'url' : url,
			'auth' : {
			    'user': me.user,
			    'pass': me.key,
			    'sendImmediately': true
			}
		}, function(err, res, body){
			if(res && res.statusCode === 200){
				if(typeof(body) !== "object"){
					try{
						body = JSON.parse(body);
					}catch(e){						
					}						
				}
				return future.resolve(new DataModel(body));
			}
			return future.reject((err || body));
		});	
		return future.promise;
	}

	this.getAllWorkers = function(){
		me.validateAuth();
		var url = me.getEndPoint('workers');
		var future = Q.defer();
		request.get({
			'url' : url,
			'auth' : {
			    'user': me.user,
			    'pass': me.key,
			    'sendImmediately': true
			}
		}, function(err, res, body){
			if(res && res.statusCode === 200){
				if(typeof(body) !== "object"){
					try{
						body = JSON.parse(body);
					}catch(e){						
					}						
				}
				return future.resolve(new DataModel(body));
			}
			return future.reject((err || body));
		});	
		return future.promise;	
	}
}

module.exports = BrowserStack;


