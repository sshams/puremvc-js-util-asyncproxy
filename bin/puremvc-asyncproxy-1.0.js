/*
  PureMVC JS Utility - Async Proxy
  Copyright (c) 2014 Saad Shams
  Your reuse is governed by the Creative Commons Attribution 3.0 License
*/


/**
 * 
 * <P>
 * Your subclass should override the <code>asyncAction</code> 
 * method where your business logic will handle the asynchronous operation, but call the super first. </P>
 * 
 */

(function (scope){
	
	if (null == scope)
	    scope = window;
	
	// if the global puremvc namespace already exists, turn back now
	if (scope.puremvc && scope.puremvc.asyncproxy)
	{
		return;
	}

/**
 * Constructor
 * @method AsyncProxy
 # @extends Proxy
 * @return
 */
function AsyncProxy(name, data) {
    puremvc.Proxy.call(this, name, data);
}

AsyncProxy.prototype = new puremvc.Proxy;
AsyncProxy.prototype.constructor = AsyncProxy;

/**
 * To set callback values for result and fault. 
 * @method asyncAction
 * @param {Function} resultFunction
 * @param {Function} faultFunction
 * @return 
 */
AsyncProxy.prototype.asyncAction = function(resultFunction, faultFunction) {
    if(this.asyncInProgress) {
        throw new Error("AsyncProxy: Cannot have more than one async activity running per instance");
    }

    this.clientResultFunction = resultFunction;
    this.clientFaultFunction = faultFunction;
    this.asyncInProgress = true;
}

/**
 * Callbacks clientResultFunction on success and passed any data as the params.
 * @method onResult
 * @param {Object} data
 * @return 
 */
AsyncProxy.prototype.onResult = function(data) {
    this.asyncInProgress = false;
    this.clientResultFunction(data);
}

/**
 * Callbacks clientFaultFunction on failure and passed any info as the params.
 * @method onFault
 * @param {Object} info
 * @return 
 */
AsyncProxy.prototype.onFault = function(info) {
    this.asyncInProgress = false;
    this.clientFaultFunction(info);
}

AsyncProxy.prototype.clientResultFunction = null;
AsyncProxy.prototype.clientFaultFunction = null;
AsyncProxy.prototype.asyncInProgress = false;
    
    // define the puremvc global namespace and export the actors
 	scope.puremvc.asyncproxy = {};
    scope.puremvc.asyncproxy.AsyncProxy = AsyncProxy;
 	
})(this); // the 'this' parameter will resolve to global scope in all environments