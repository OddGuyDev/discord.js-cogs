/*
 * LICENSED BY LoeDoesCode
 *      MIT LICENSE
 *    AUGUST 19, 2019
 */

'use-strict';

const fs = require('fs');
const EventEmitter = require('events'); 
const { addEventListener, removeEventListener } = require('./EventListener.js');
const Cog = require("./Cog.js");

/**
 * Class representing a Cog Client.
 *
 * @extends EventEmitter
 */
class Client extends EventEmitter {
  /**
   * Create a new `CogClient`.
   *
   * @param {Object} discord.js Client to reference
   * @param {Object} options Client options
   */
   /**
   * @param {ClientOptions} [options] Options for the Client
   */
  constructor(client, options = {}) {
    super();
    
    /**
     * A Discord.JS Client
     * @type {Object}
     */
    this.client = client;
    /**
     * Options loaded for the Cogs Client
     * @type {?Object}
     */
    this.options = options;
    /**
     * Custom prefix for the Client
     * @type {?String}
     */
    this.prefix = options.prefix;
    
    
   /**
    * Cogs for the Client
    * @type {?Array[Cog]}
    */
    this.cogs = {};
    
    if (options.cogs) this.cogs = options.cogs;
    
   /**
    * Commands folder directory
    * @type {String}
    */
    if (options.commandDir) {
    	this.commandDir = options.commandDir;
    } else {
    	this.commandDir = "./commands/";
    }
    this.listFunctions = () => {
    	console.log("+= Funcions           =+");
    	            ""
    	let funcs = [
    	    'getCogs()',
    	    'getCog()',
    	    'addCog()'
    	];
    	let d;
    	funcs.forEach(i => {
    	    let d = " ",
                o;
    	    for (o = 0; o < Math.floor(25 - i.length - 4); ++o) {
        	    d = " " + d;
    	    }
    	    console.log("| " + i + d + "|");
    	});
    	console.log("+=======================+")
    }
    
  }
  
  // PUT ON PRIVATE FOR "BEING UTTERLY USELESS"
 /**
  * Cogs loaded in Client
  * @returns {?Cogs[]}
  * @private
  */
  get getCogs() {
   	return this.cogs;
   }
   
 /**
  * Runs a command for a Cog
  * @param {String} command name
  * @param {Object} arguments
  * @returns {Promise<Object>}
  */
  runCommand(name, args) {
      let cog = this.cogs.filter(cog => c.commandNames.include(name))[0];
      return new Promise(function (fulfill, reject) {
          if (cog == undefined || cog == null || cog == []) return reject(Error("Command not found in Cogs"));
          return fulfill(cog.commands[name](args));
      });
  }
   
  /**
   * Gets a cog
   * @param {String} Cog (file) name
   * @returns {?Cog}
   */
  fetchCog(cog_name) {
  	if (this.cogs.get("name", cog_name)) {
  	    return this.cogs.get("name", cog_name);
      } else {
      	if (this._events.error) {
      	    this.emit("error", "Cog name provided is invalid");
          } else {
          	Error("Cog Name provided is invalid");
              return;
          }
      }
  }
  
 /**
  * Adds a cog to the Client
  * @param {String} name of Cog
  * @param {Object} options Cog options
  * @returns {?Cog}
  */
  addCog(name, options) {
      if (fs.existsSync(this.commandDir + "/" + name + ".js")) {
          if (options) let nc = new Cog(this.commandDir + "/" + name + ".js", name, options, this);
          if (!options) let nc = new Cog(this.commandDir + "/" + name + ".js", name, {}, this);
          this.cogs.push(nc);
          return nc;
      } else {
      	if (this._events.error) {
      	    this.emit("error", "Cog file does not exist");
              return;
          } else {
          	Error("Cog file does not exist")
          }
      }
  }
 /**
  * Reload Cog
  * <warn> This is purposely added to let the Cogs reload them into the Client</warn>
  * @param {String} name of Cog
  * @returns {?err|Client}
  * @private
  */
  reloadCog(name, newCog) {
      let cogs = Object.enteries(this.cogs).filter(c => c.name !== name);
      let newCogs = Object.assign(cogs, newCog);
      this.cogs = newCogs;
  }

}

['error'].forEach((method) => {
  Object.defineProperty(Client.prototype, `on${method}`, {
    /**
     * Return the listener of the event.
     *p
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get() {
      const listeners = this.listeners(method);
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }

      return undefined;
    },
    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set(listener) {
      const listeners = this.listeners(method);
      for (let i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }
      this.addEventListener(method, listener);
    }
  });
});

Client.prototype.addEventListener = addEventListener;
Client.prototype.removeEventListener = removeEventListener;

module.exports = Client;