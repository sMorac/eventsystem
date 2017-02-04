/*jshint esversion: 6 */
/*jshint node: true */
/* globals __base */
/* globals __chatsessions */
/* globals __flows */
/* globals __config */


'use strict'; 

class EventSystem{
    constructor(){
    }
    on(event, callback){
        if(!callback) return;
        this._callbacks = (typeof this._callbacks !== 'undefined')? this._callbacks: {};
        this._callbacks[event] = (typeof this._callbacks[event] !== 'undefined')? this._callbacks[event]:[];
        this._callbacks[event].push(callback);
    }
    off(event, callback){
        this._callbacks = (typeof this._callbacks !== 'undefined')? this._callbacks: {};
        let event_callbacks = this._callbacks[event];
        if(!event_callbacks) return;
        for (let i=event_callbacks.length-1; i>=0; i--){
            if(event_callbacks[i] == callback){
                event_callbacks.splice(i,1);
                break;
            }
        }
    }    
    allOff(event){
        this._callbacks = (typeof this._callbacks !== 'undefined')? this._callbacks: {};
        
        if(!this._callbacks[event]) return;
        delete this._callbacks[event];
    }
    emit(event, args){
        this._callbacks = (typeof this._callbacks !== 'undefined')? this._callbacks: {};
        let event_callbacks = this._callbacks[event];
        if(!event_callbacks) return; 
        for (var i = event_callbacks.length-1; i >= 0; i--){
            if(event_callbacks[i])
                event_callbacks[i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}

module.exports = EventSystem; 


