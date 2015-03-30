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
    this.token = token;
    this.asyncInProgress = true;
};

/**
 * Callbacks success and passed data and token
 * @method onResult
 * @param {Object} data
 * @return
 */
AsyncProxy.prototype.onResult = function(data) {
    this.asyncInProgress = false;
    this.responder.result(data, this.token);
};

/**
 * Callbacks fail and passed data and token
 * @method onFault
 * @param {Object} info
 * @return
 */
AsyncProxy.prototype.onFault = function(info) {
    this.asyncInProgress = false;
    this.responder.fault(info, this.token);
};

AsyncProxy.prototype.responder = null;
AsyncProxy.prototype.token = null;
AsyncProxy.prototype.asyncInProgress = false;

    // define the puremvc global namespace and export the actors
    scope.puremvc.asyncproxy = {};
    scope.puremvc.asyncproxy.AsyncProxy = AsyncProxy;

})(this); // the 'this' parameter will resolve to global scope in all environments