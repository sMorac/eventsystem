'use strict'; 

function EventSystem(){
}

EventSystem.prototype = {
    on: function(event,callback){ // Event binder
        this._callbacks = (typeof this._callbacks !== 'undefined')? this._callbacks: {};
        this._callbacks[event] = (typeof this._callbacks[event] !== 'undefined')? this._callbacks[event]:[];
        this._callbacks[event].push(callback);
    },
    off: function(event,callback){ // Event unbinder
        this._callbacks = (typeof this._callbacks !== 'undefined')? this._callbacks: {};
        var event_callbacks = this._callbacks[event];
        if(event_callbacks == undefined) return;
        for (var i=event_callbacks.length-1; i>=0; i--){
            if(event_callbacks[i] == callback){
                event_callbacks.splice(i,1);
                break;
            }
        }
    }, 
    emit: function(event,args){ // Event emitter
        this._callbacks = (typeof this._callbacks !== 'undefined')? this._callbacks: {};
        var event_callbacks = this._callbacks[event];
        if(event_callbacks == undefined) return; 
        for (var i=event_callbacks.length-1; i>=0; i--)
            event_callbacks[i].apply(this, Array.prototype.slice.call(arguments, 1));
    },
};
// Export for CommonJs
if(typeof module !== 'undefined' && module.exports)
    module.exports = EventSystem;
