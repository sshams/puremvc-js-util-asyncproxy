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
 * To set responder and the token
 * @method asyncAction
 * @param {Interface} responder
 * @param {Object} token
 * @return 
 */
AsyncProxy.prototype.asyncAction = function(responder, token) {
    if(this.asyncInProgress) {
        throw new Error("AsyncProxy: Cannot have more than one async activity running per instance");
    }

    this.responder = responder;
    this.token = token
    this.asyncInProgress = true;
}

/**
 * Callbacks success and passed data and token
 * @method onResult
 * @param {Object} data
 * @return 
 */
AsyncProxy.prototype.onResult = function(data) {
    this.asyncInProgress = false;
    this.responder.success(data, this.token);
}

/**
 * Callbacks fail and passed data and token
 * @method onFault
 * @param {Object} info
 * @return 
 */
AsyncProxy.prototype.onFault = function(info) {
    this.asyncInProgress = false;
    this.responder.fail(info, this.token);
}

AsyncProxy.prototype.responder = null;
AsyncProxy.prototype.token = null
AsyncProxy.prototype.asyncInProgress = false;