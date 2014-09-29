/**
 * @fileOverview
 * PureMVC Async Proxy Utility JS Port by Saad Shams
 * Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 * Reuse governed by Creative Commons Attribution 3.0 
 * http://creativecommons.org/licenses/by/3.0/us/
 */

/**
 * 
 * <P>
 * Your subclass should override the <code>asyncAction</code> 
 * method where your business logic will handle the asynchronous operation, but call the super first. </P>
 * 
 */

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